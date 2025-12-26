package ma.sieger.conferenceservice.service;

import lombok.AllArgsConstructor;
import ma.sieger.conferenceservice.dtos.ReviewResponseDTO;
import ma.sieger.conferenceservice.entities.Conference;
import ma.sieger.conferenceservice.entities.Review;
import ma.sieger.conferenceservice.mappers.ReviewMapper;
import ma.sieger.conferenceservice.repositories.ConferenceRepository;
import ma.sieger.conferenceservice.repositories.ReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@Transactional
@AllArgsConstructor
public class ReviewServiceImp implements ReviewService {
    private ReviewRepository reviewRepository;
    private ConferenceRepository conferenceRepository;
    private ReviewMapper reviewMapper;

    @Override
    public ReviewResponseDTO addReviewToConference(Long conferenceId, Review review) {
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new RuntimeException("Conference not found"));

        review.setConference(conference);
        review.setDate(LocalDate.now());

        conference.getReviews().add(review);
        Review savedReview = reviewRepository.save(review);

        return reviewMapper.fromReview(savedReview);
    }
}
