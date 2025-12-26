package ma.sieger.conferenceservice.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data @NoArgsConstructor
@AllArgsConstructor @Builder
public class Conference {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String type;
    private LocalDate date;
    private int duration;
    private int registeredCount;
    private double score;

    private Long keynoteId;

    @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Review> reviews = new ArrayList<>();
}
