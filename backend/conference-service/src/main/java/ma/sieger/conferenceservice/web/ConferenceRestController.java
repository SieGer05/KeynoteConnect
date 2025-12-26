package ma.sieger.conferenceservice.web;

import lombok.AllArgsConstructor;
import ma.sieger.conferenceservice.dtos.ConferenceRequestDTO;
import ma.sieger.conferenceservice.dtos.ConferenceResponseDTO;
import ma.sieger.conferenceservice.entities.Conference;
import ma.sieger.conferenceservice.mappers.ConferenceMapper;
import ma.sieger.conferenceservice.service.ConferenceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conferences")
@AllArgsConstructor
public class ConferenceRestController {
    private ConferenceService conferenceService;
    private ConferenceMapper conferenceMapper;

    @GetMapping
    public List<ConferenceResponseDTO> listConferences() {
        return conferenceService.getAllConferences();
    }

    @GetMapping("/{id}")
    public ConferenceResponseDTO getConference(@PathVariable Long id) {
        return conferenceService.getConferenceById(id);
    }

    @PostMapping
    public ConferenceResponseDTO saveConference(@RequestBody ConferenceRequestDTO conferenceRequestDTO) {
        Conference conference = conferenceMapper.toEntity(conferenceRequestDTO);
        return conferenceService.saveConference(conference);
    }
}
