package ma.sieger.conferenceservice.service;

import ma.sieger.conferenceservice.dtos.ConferenceResponseDTO;
import ma.sieger.conferenceservice.entities.Conference;

import java.util.List;

public interface ConferenceService {
    ConferenceResponseDTO saveConference(Conference conference);
    ConferenceResponseDTO getConferenceById(Long id);
    List<ConferenceResponseDTO> getAllConferences();
}