package mpti.common.errors;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class IsNotSendersReservationException extends RuntimeException {

    public IsNotSendersReservationException(Long id){
        super("Reservation [id : " + id + " ] is not sender's reservation");
        log.error("requested reservation is not sender's reservation");
    }
}
