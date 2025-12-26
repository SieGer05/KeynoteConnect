package ma.sieger.keynoteservice.mappers;

import ma.sieger.keynoteservice.dtos.KeynoteResponseDTO;
import ma.sieger.keynoteservice.entities.Keynote;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class KeynoteMapper {
    public KeynoteResponseDTO fromKeynote(Keynote keynote) {
        KeynoteResponseDTO keynoteResponseDTO = new KeynoteResponseDTO();
        BeanUtils.copyProperties(keynote, keynoteResponseDTO);
        return keynoteResponseDTO;
    }
}