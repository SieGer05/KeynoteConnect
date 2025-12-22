package ma.sieger.keynoteservice.web;

import lombok.AllArgsConstructor;
import ma.sieger.keynoteservice.dtos.KeynoteResponseDTO;
import ma.sieger.keynoteservice.entities.Keynote;
import ma.sieger.keynoteservice.mappers.KeynoteMapper;
import ma.sieger.keynoteservice.repositories.KeynoteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class KeynoteRestController {
    private KeynoteRepository keynoteRepository;
    private KeynoteMapper keynoteMapper;

    @GetMapping("/keynotes")
    public List<KeynoteResponseDTO> getKeynotes() {
        return keynoteRepository.findAll().stream()
                .map(keynoteMapper::fromKeynote)
                .collect(Collectors.toList());
    }

    @GetMapping("/keynotes/{id}")
    public KeynoteResponseDTO getKeynoteById(@PathVariable Long id) {
        return keynoteRepository.findById(id)
                .map(keynoteMapper::fromKeynote)
                .orElseThrow(() -> new RuntimeException("Keynote not found with id: " + id));
    }

    @PostMapping("/keynotes")
    public KeynoteResponseDTO saveKeynote(@RequestBody Keynote keynote) {
        Keynote savedKeynote = keynoteRepository.save(keynote);
        return keynoteMapper.fromKeynote(savedKeynote);
    }
}
