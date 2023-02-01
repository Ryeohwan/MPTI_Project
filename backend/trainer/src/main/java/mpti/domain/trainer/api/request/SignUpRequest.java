package mpti.domain.trainer.api.request;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class SignupRequest {

    @NotNull
    private String name;
    @Email
    @NotNull
    @Email
    @Size(min = 3, max = 50)
    private String email;

    private String imageUrl;
    @Column(nullable = false)
    private Boolean emailVerified = false;
    private String password;
    private String provider;
    private String providerId;
    private String gender;
    private String phone;
    private String address;
    private String license;
}
