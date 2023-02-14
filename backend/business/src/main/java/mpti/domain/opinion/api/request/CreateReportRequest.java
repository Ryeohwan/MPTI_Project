package mpti.domain.opinion.api.request;

import lombok.Getter;
import mpti.domain.opinion.entity.Role;

@Getter
public class CreateReportRequest {

    private Long writerId;

    private String writerName;

    private Long targetId;

    private String targetName;

    private String reportType;

    private String targetRole;

    private String memo;

}
