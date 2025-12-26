package ma.sieger.conferenceservice.web;

import lombok.AllArgsConstructor;
import ma.sieger.conferenceservice.dtos.ConferenceResponseDTO;
import ma.sieger.conferenceservice.service.ConferenceService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/conferences")
@AllArgsConstructor
public class ConferenceRestController {
    private ConferenceService conferenceService;

    @GetMapping
    public List<ConferenceResponseDTO> listConferences() {
        return conferenceService.getAllConferences();
    }

    @GetMapping("/{id}")
    public ConferenceResponseDTO getConference(@PathVariable Long id) {
        return conferenceService.getConferenceById(id);
    }
}
