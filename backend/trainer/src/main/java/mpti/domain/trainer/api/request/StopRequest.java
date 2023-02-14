package mpti.domain.trainer.api.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class StopRequest {
    private Long id;
    private LocalDate stopUntil;
}
