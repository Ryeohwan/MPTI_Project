package mpti.common.errors;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ReviewNotFoundException extends RuntimeException{

    public ReviewNotFoundException(Long id){
        super("Review [id : " + id + " ] Not Found");
        log.error("review is not found");
    }
}
