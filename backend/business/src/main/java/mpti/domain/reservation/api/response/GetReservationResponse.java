package mpti.domain.reservation.api.response;

import lombok.Getter;
import mpti.domain.reservation.entity.Reservation;

import java.time.LocalDateTime;

@Getter
public class GetReservationResponse {

    private Long id;

    private Long trainerId;

    private Long userId;

    private int year, month, day, hour;

    private LocalDateTime createdAt;

    public GetReservationResponse(Reservation reservation) {
        this.id = reservation.getId();
        this.trainerId = reservation.getTrainerId();
        this.userId = reservation.getUserId();
        this.year = reservation.getYear();
        this.month = reservation.getMonth();
        this.day = reservation.getDay();
        this.hour = reservation.getHour();
        this.createdAt = reservation.getCreatedAt();
    }
}
