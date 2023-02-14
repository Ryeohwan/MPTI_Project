package mpti.domain.opinion.dto;

import lombok.Getter;
import mpti.domain.opinion.entity.Report;
import java.time.LocalDateTime;
import java.util.Optional;

@Getter
public class ReportDto {

    private Long id;

    private Long writerId;

    private Long targetId;

    private String writerName;

    private String targetName;

    private LocalDateTime createdAt;

    private String memo;

    private LocalDateTime stopUntil;

    public ReportDto(Optional<Report> report){
        this.id = report.orElseThrow().getId();
        this.writerId = report.orElseThrow().getWriterId();
        this.targetId = report.orElseThrow().getTargetId();
        this.writerName = report.orElseThrow().getWriterName();
        this.targetName = report.orElseThrow().getTargetName();
        this.createdAt = report.orElseThrow().getCreatedAt();
        this.memo = report.orElseThrow().getMemo();
        this.stopUntil = report.orElseThrow().getStopUntil();
    }
}
