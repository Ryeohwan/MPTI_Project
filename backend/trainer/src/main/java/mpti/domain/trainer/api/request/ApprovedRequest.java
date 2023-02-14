package mpti.domain.trainer.api.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;

@Getter
@Setter
public class ApprovedRequest {
    @Email
    private String email;

    private Boolean approved;
}
