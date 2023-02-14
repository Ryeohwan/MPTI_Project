package mpti.common.errors;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ReportNotFoundException extends RuntimeException{

    public ReportNotFoundException(Long id){
        super("Report [id : " + id + " ] Not Found");
        log.error("report is not found");
    }
}
