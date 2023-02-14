package mpti.domain.trainer.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.ArrayList;

@Setter
@Getter
@Builder
public class SignUpRequest {
    @NotNull
    private String name;
    @Email
    @NotNull
    @Email
    @Size(min = 3, max = 50)
    private String email;
    private String password;
    private LocalDate birthday;
    private String gender;
    private String phone;
    private String awards;
    private String license;
    private String career;
    private String imageUrl;
//    @Column(nullable = false)
//    private Boolean emailVerified = false;

}
