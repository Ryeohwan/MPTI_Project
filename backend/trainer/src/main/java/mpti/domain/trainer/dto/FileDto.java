package mpti.domain.trainer.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
@Getter
@Setter
public class FileDto {
    private String email;
    private String title;
    private String url;
    private MultipartFile file;
}
