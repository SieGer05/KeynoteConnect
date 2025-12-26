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
            // ==========================================
            // CONFERENCE 1 : Amine SieGer (Keynote ID 1)
            // ==========================================
            Conference conf1 = Conference.builder()
                    .title("Spring Cloud Patterns & Microservices")
                    .type("Academic")
                    .date(LocalDate.now())
                    .duration(60)
                    .keynoteId(1L) // Amine SieGer
                    .build();

            ConferenceResponseDTO savedConf1 = conferenceService.saveConference(conf1);

            reviewService.addReviewToConference(savedConf1.id(), Review.builder()
                    .date(LocalDate.now())
                    .text("Excellent presentation, clear and concise!")
                    .stars(5)
                    .build());

            reviewService.addReviewToConference(savedConf1.id(), Review.builder()
                    .date(LocalDate.now())
                    .text("A bit too technical for beginners but great content.")
                    .stars(4)
                    .build());

            // ==========================================
            // CONFERENCE 2 : John Doe (Keynote ID 2)
            // ==========================================
            Conference conf2 = Conference.builder()
                    .title("Zero Trust Architecture & AI Security")
                    .type("Commercial")
                    .date(LocalDate.now().plusDays(15)) // Dans le futur
                    .duration(90)
                    .keynoteId(2L) // John Doe
                    .build();

            ConferenceResponseDTO savedConf2 = conferenceService.saveConference(conf2);

            reviewService.addReviewToConference(savedConf2.id(), Review.builder()
                    .date(LocalDate.now().minusDays(1))
                    .text("Mind-blowing insights on AI threats.")
                    .stars(5)
                    .build());

            // ==========================================
            // CONFERENCE 3 : Sarah Connor (Keynote ID 3)
            // ==========================================
            Conference conf3 = Conference.builder()
                    .title("Modern Frontend with React 19")
                    .type("Commercial")
                    .date(LocalDate.now().minusDays(5)) // Passée
                    .duration(45)
                    .keynoteId(3L) // Sarah Connor
                    .build();

            ConferenceResponseDTO savedConf3 = conferenceService.saveConference(conf3);

            reviewService.addReviewToConference(savedConf3.id(), Review.builder()
                    .date(LocalDate.now().minusDays(2))
                    .text("Sarah is an amazing speaker. Learned a lot about Hooks.")
                    .stars(5)
                    .build());

            reviewService.addReviewToConference(savedConf3.id(), Review.builder()
                    .date(LocalDate.now().minusDays(2))
                    .text("Examples were too simple.")
                    .stars(3)
                    .build());
        };
    }
}
