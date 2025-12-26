package ma.sieger.conferenceservice.service;

import lombok.AllArgsConstructor;
import ma.sieger.conferenceservice.dtos.ConferenceResponseDTO;
import ma.sieger.conferenceservice.entities.Conference;
import ma.sieger.conferenceservice.entities.Review;
import ma.sieger.conferenceservice.feign.KeynoteRestClient;
import ma.sieger.conferenceservice.mappers.ConferenceMapper;
import ma.sieger.conferenceservice.model.Keynote;
import ma.sieger.conferenceservice.repositories.ConferenceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class ConferenceServiceImp implements ConferenceService {
    private ConferenceRepository conferenceRepository;
    private ConferenceMapper conferenceMapper;
    private KeynoteRestClient keynoteRestClient;

    @Override
    public ConferenceResponseDTO saveConference(Conference conference) {
        Conference savedConference = conferenceRepository.save(conference);
        return getConferenceById(savedConference.getId());
    }

    @Override
    public ConferenceResponseDTO getConferenceById(Long id) {
        Conference conference = conferenceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Conference not found"));

        calculateAndSetScore(conference);

        Keynote keynote = null;
        try {
            keynote = keynoteRestClient.getKeynoteById(conference.getKeynoteId());
        } catch (Exception e) {
            keynote = null;
        }

        return conferenceMapper.fromConference(conference, keynote);
    }

    @Override
    public List<ConferenceResponseDTO> getAllConferences() {
        return conferenceRepository.findAll().stream()
                .map(this::mapConferenceToDTO)
                .collect(Collectors.toList());
    }

    private ConferenceResponseDTO mapConferenceToDTO(Conference conference) {
        calculateAndSetScore(conference);

        Keynote keynote = null;
        try {
            keynote = keynoteRestClient.getKeynoteById(conference.getKeynoteId());
        } catch (Exception e) {
            keynote = null;
        }
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