package mpti.domain.business.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("report")
@Getter
@Setter
public class Report extends Opinion{

    private LocalDateTime stopUntil;

    public LocalDateTime setStopUntil(int blockPeriod){
        return this.stopUntil = this.getCreatedAt().plusDays(blockPeriod);
    }


}
