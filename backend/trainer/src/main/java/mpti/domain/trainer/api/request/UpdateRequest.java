package mpti.domain.trainer.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;


@Getter
@Setter
@Builder
public class UpdateRequest {

    @Column(nullable = false)
    private String name;
    private String imageUrl;
    private String phone;
    private String gender;

}
