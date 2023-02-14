package mpti.domain.trainer.dto;


import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
@Data
@Builder
public class TrainerDto {

    private Long id;
    @Column(nullable = false)
    private String name;
    @Email
    @Column(nullable = false, unique = true)
    private String email;
    private LocalDate birthday;
    private String gender;
    private String phone;
    private String awards;
    private String license;
    private String career;
    private final String role = "trainer";
    private double stars;
    private String title;
    private String s3Url;
    private String imageUrl;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
//    private LocalDate stopUntil;


    public void setTitle(String title) {
       if(title != null) this.title = title;
    }

    public void setS3Url(String s3Url) {
        if(s3Url != null) this.s3Url = s3Url;
    }
}
