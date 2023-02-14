package mpti.domain.opinion.api.request;

import lombok.Data;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Data
public class ProcessRequest {

    private Long id;

    private LocalDate stopUntil;

    public void setId(Long id) {
        this.id = id;
    }

    public void setStopUntil(LocalDateTime stopUntil) {
        this.stopUntil = stopUntil.toLocalDate();
    }
}
