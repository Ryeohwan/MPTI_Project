package mpti.domain.opinion.entity;

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

    public void setStopUntil(int blockPeriod){
        this.stopUntil = this.getCreatedAt().plusDays(blockPeriod);
    }


}
