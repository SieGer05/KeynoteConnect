package ma.sieger.conferenceservice.dtos;

import ma.sieger.conferenceservice.model.Keynote;

import java.time.LocalDate;
import java.util.List;

public record ConferenceResponseDTO(
        Long id,
        String title,
        String type,
        LocalDate date,
        int duration,
        int registeredCount,
        double score,
        List<ReviewResponseDTO> reviews,
        Keynote keynote
) {}
