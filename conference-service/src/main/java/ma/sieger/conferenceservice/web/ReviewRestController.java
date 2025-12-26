package ma.sieger.conferenceservice.web;

import lombok.AllArgsConstructor;
import ma.sieger.conferenceservice.dtos.ReviewResponseDTO;
import ma.sieger.conferenceservice.entities.Review;
import ma.sieger.conferenceservice.service.ReviewService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class ReviewRestController {
    private ReviewService reviewService;

    @PostMapping("/conferences/{conferenceId}/reviews")
    public ReviewResponseDTO saveReview(
            @PathVariable Long conferenceId,
            @RequestBody Review review
    ) {
        return reviewService.addReviewToConference(conferenceId, review);
    }
}