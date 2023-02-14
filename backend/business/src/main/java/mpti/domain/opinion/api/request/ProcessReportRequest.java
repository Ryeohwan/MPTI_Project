package mpti.domain.opinion.api.request;

import lombok.Getter;

@Getter
public class ProcessReportRequest {

    Long id;

    int blockPeriod;

    public ProcessReportRequest() {
    }

    public ProcessReportRequest(Long id, int blockPeriod) {
        this.id = id;
        this.blockPeriod = blockPeriod;
    }
}
