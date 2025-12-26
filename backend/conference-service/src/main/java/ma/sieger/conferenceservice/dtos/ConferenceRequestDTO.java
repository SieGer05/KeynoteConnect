package ma.sieger.conferenceservice.dtos;

import java.time.LocalDate;

public record ConferenceRequestDTO(
    String title,
    String type,
    LocalDate date,
    int duration,
    Long keynoteId
) {}