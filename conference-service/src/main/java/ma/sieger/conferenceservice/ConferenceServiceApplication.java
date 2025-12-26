package ma.sieger.conferenceservice;

import ma.sieger.conferenceservice.dtos.ConferenceResponseDTO;
import ma.sieger.conferenceservice.entities.Conference;
import ma.sieger.conferenceservice.entities.Review;
import ma.sieger.conferenceservice.service.ConferenceService;
import ma.sieger.conferenceservice.service.ReviewService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
@EnableFeignClients
public class ConferenceServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConferenceServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(ConferenceService conferenceService, ReviewService reviewService) {
        return args -> {
            Conference conf = Conference.builder()
                    .title("Spring Cloud Patterns")
                    .type("Academic")
                    .date(LocalDate.now())
                    .duration(60)
                    .keynoteId(1L)
                    .build();

            ConferenceResponseDTO savedConf = conferenceService.saveConference(conf);

            reviewService.addReviewToConference(savedConf.id(), Review.builder()
                    .text("Excellent presentation!")
                    .stars(5)
                    .build());

            reviewService.addReviewToConference(savedConf.id(), Review.builder()
                    .text("A bit too technical but good.")
                    .stars(3)
                    .build());
        };
    }
}
