package mpti.domain.opinion.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("report")
@Getter
@Setter
public class Report extends Opinion{


    private String reportType;


    @Enumerated(EnumType.STRING)
    private Role targetRole;

    private LocalDateTime stopUntil;


    public void setStopUntil(int blockPeriod){
        this.stopUntil = this.getCreatedAt().plusDays(blockPeriod);
    }


    public Report() {
    }

    @Builder
    public Report(Long writerId, Long targetId, String writerName, String targetName, String memo, String reportType, Role targetRole, LocalDateTime stopUntil) {
        super(writerId, targetId, writerName, targetName, memo);
        this.reportType = reportType;
        this.targetRole = targetRole;
        this.stopUntil = stopUntil;
    }
}
