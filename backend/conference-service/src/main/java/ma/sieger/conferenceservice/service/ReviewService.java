package ma.sieger.conferenceservice.service;

import ma.sieger.conferenceservice.dtos.ReviewResponseDTO;
import ma.sieger.conferenceservice.entities.Review;

public interface ReviewService {
    ReviewResponseDTO addReviewToConference(Long conferenceId, Review review);
}