package ma.sieger.conferenceservice.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ma.sieger.conferenceservice.model.Keynote;

import java.time.LocalDate;
import java.util.List;

public record ConferenceResponseDTO(
        @JsonIgnore Long id,
        String title,
        String type,
        LocalDate date,
        int duration,
        double score,
        List<ReviewResponseDTO> reviews,
        Keynote keynote
) {}
