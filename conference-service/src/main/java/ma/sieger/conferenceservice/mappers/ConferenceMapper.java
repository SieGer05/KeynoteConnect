package ma.sieger.conferenceservice.mappers;

import ma.sieger.conferenceservice.dtos.ConferenceResponseDTO;
import ma.sieger.conferenceservice.entities.Conference;
import ma.sieger.conferenceservice.model.Keynote;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class ConferenceMapper {
    private final ReviewMapper reviewMapper;

    public ConferenceMapper(ReviewMapper reviewMapper) {
        this.reviewMapper = reviewMapper;
    }

    public ConferenceResponseDTO fromConference(Conference conference, Keynote keynote){
        return new ConferenceResponseDTO(
                conference.getId(),
                conference.getTitle(),
                conference.getType(),
                conference.getDate(),
                conference.getDuration(),
                conference.getScore(),
                conference.getReviews() != null ?
                        conference.getReviews().stream().map(reviewMapper::fromReview).toList() :
                        Collections.emptyList(),
                keynote
        );
    }
}