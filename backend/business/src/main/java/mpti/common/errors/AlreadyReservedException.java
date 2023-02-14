package mpti.common.errors;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AlreadyReservedException extends RuntimeException {

    public AlreadyReservedException(Long id){
        super("Reservation [id : " + id + " ] is already reserved");
        log.error("requested reservation is already reserved");
    }
}
