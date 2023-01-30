package mpti.domain.opinion.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ProcessReportResponse {

    private Long id;

    @Builder
    public ProcessReportResponse(Long id){
        this.id = id;
    }
}
