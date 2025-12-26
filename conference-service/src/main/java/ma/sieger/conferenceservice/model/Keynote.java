package ma.sieger.conferenceservice.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Keynote {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String function;
}