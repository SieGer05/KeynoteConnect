package ma.sieger.conferenceservice.dtos;

import java.time.LocalDate;

public record ReviewResponseDTO(
        LocalDate date,
        String text,
        int stars
) {}