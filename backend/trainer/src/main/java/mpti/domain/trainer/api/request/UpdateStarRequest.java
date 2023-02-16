package mpti.domain.trainer.api.request;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateStarRequest {

    private Long id;

    private Double star;
}