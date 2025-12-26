package ma.sieger.conferenceservice.feign;

import ma.sieger.conferenceservice.config.FeignClientConfig;
import ma.sieger.conferenceservice.model.Keynote;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "KEYNOTE-SERVICE", configuration = FeignClientConfig.class)
public interface KeynoteRestClient {
    @GetMapping("/api/keynotes/{id}")
    Keynote getKeynoteById(@PathVariable Long id);

    @GetMapping("/api/keynotes")
    List<Keynote> getAllKeynotes();
}
