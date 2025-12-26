package ma.sieger.keynoteservice;

import ma.sieger.keynoteservice.entities.Keynote;
import ma.sieger.keynoteservice.repositories.KeynoteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class KeynoteServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(KeynoteServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(KeynoteRepository keynoteRepository) {
        return args -> {
            List<Keynote> keynotes = List.of(
                    Keynote.builder()
                            .firstName("Amine")
                            .lastName("SieGer")
                            .email("amine@gmail.ma")
                            .function("Engineer")
                            .build(),
                    Keynote.builder()
                            .firstName("John")
                            .lastName("Doe")
                            .email("john.doe@gmail.com")
                            .function("Researcher")
                            .build(),
                    Keynote.builder()
                            .firstName("Sarah")
                            .lastName("Connor")
                            .email("s.connor@tech.com")
                            .function("Keynote Speaker")
                            .build()
            );

            keynoteRepository.saveAll(keynotes);

            keynoteRepository.findAll().forEach(k -> {
                System.out.println("Inserted Keynote: " + k.getFirstName() + " " + k.getLastName());
            });
        };
    }
}
