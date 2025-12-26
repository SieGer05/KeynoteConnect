package ma.sieger.conferenceservice.service;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import ma.sieger.conferenceservice.dtos.ConferenceResponseDTO;
import ma.sieger.conferenceservice.entities.Conference;
import ma.sieger.conferenceservice.entities.Review;
import ma.sieger.conferenceservice.feign.KeynoteRestClient;
import ma.sieger.conferenceservice.mappers.ConferenceMapper;
import ma.sieger.conferenceservice.model.Keynote;
import ma.sieger.conferenceservice.repositories.ConferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ConferenceServiceImp implements ConferenceService {
    private final ConferenceRepository conferenceRepository;
    private final ConferenceMapper conferenceMapper;
    private final KeynoteRestClient keynoteRestClient;

    @Autowired
    @Lazy
    private ConferenceService self;

    @Override
    public ConferenceResponseDTO saveConference(Conference conference) {
        Conference savedConference = conferenceRepository.save(conference);
        return self.getConferenceById(savedConference.getId());
    }

    @Override
    public ConferenceResponseDTO getConferenceById(Long id) {
        Conference conference = conferenceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Conference not found"));

        calculateAndSetScore(conference);
        Keynote keynote = self.getKeynoteFromClient(conference.getKeynoteId());
        return conferenceMapper.fromConference(conference, keynote);
    }

    /**
     * Cette méthode est séparée pour isoler l'appel réseau de la transaction BDD.
     * Propagation.NOT_SUPPORTED : Suspend la transaction en cours.
     * Si Feign échoue, l'exception ne marquera pas la transaction BDD comme "Rollback Only".
     */
    @CircuitBreaker(name = "keynoteService", fallbackMethod = "fallbackKeynote")
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public Keynote getKeynoteFromClient(Long id) {
        return keynoteRestClient.getKeynoteById(id);
    }

    /**
     * Méthode de Fallback qui retourne un Keynote par défaut.
     * Elle doit avoir la même signature que getKeynoteFromClient (paramètres + Throwable).
     */
    public Keynote fallbackKeynote(Long id, Throwable t) {
        Keynote defaultKeynote = new Keynote();
        defaultKeynote.setId(id);
        defaultKeynote.setFirstName("Non disponible");
        defaultKeynote.setLastName("(Service Keynote Down)");
        defaultKeynote.setEmail("");
        defaultKeynote.setFunction("Unknown");
        return defaultKeynote;
    }

    @Override
    public List<ConferenceResponseDTO> getAllConferences() {
        return conferenceRepository.findAll().stream()
                .map(this::mapConferenceToDTO)
                .collect(Collectors.toList());
    }

    private ConferenceResponseDTO mapConferenceToDTO(Conference conference) {
        calculateAndSetScore(conference);
        Keynote keynote = self.getKeynoteFromClient(conference.getKeynoteId());
        return conferenceMapper.fromConference(conference, keynote);
    }

    private void calculateAndSetScore(Conference conference) {
        if (conference.getReviews() != null && !conference.getReviews().isEmpty()) {
            double average = conference.getReviews().stream()
                    .mapToDouble(Review::getStars)
                    .average()
                    .orElse(0.0);
            conference.setScore(average);
        } else {
            conference.setScore(0.0);
        }
    }
}