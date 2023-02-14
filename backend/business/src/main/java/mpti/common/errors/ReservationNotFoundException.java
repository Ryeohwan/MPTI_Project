package mpti.common.errors;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ReservationNotFoundException extends RuntimeException{

    public ReservationNotFoundException(Long id){
        super("Reservation [id : " + id + " ] Not Found");
        log.error("reservation not found");
    }
}
