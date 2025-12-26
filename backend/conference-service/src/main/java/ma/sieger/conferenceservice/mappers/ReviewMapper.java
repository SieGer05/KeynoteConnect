package ma.sieger.conferenceservice.mappers;

import ma.sieger.conferenceservice.dtos.ReviewResponseDTO;
import ma.sieger.conferenceservice.entities.Review;
import org.springframework.stereotype.Service;

@Service
public class ReviewMapper {
    public ReviewResponseDTO fromReview(Review review) {
        return new ReviewResponseDTO(review.getDate(), review.getText(), review.getStars());
    }
}
