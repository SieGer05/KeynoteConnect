package ma.sieger.keynoteservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor
@AllArgsConstructor @Builder
public class KeynoteResponseDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String function;
}