package mpti.domain.reservation.api.response;

import lombok.Getter;
import mpti.domain.reservation.entity.Reservation;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
public class GetReservationResponse {

    private Long id;

    private Long trainerId;

    private String trainerName;

    private Long userId;

    private String userName;

    private int year, month, day, hour;

    private String sessionId;

    private LocalDateTime createdAt;

    public GetReservationResponse(Reservation reservation) {
        this.id = reservation.getId();
        this.trainerId = reservation.getTrainerId();
        this.trainerName = reservation.getTrainerName();
        this.userId = reservation.getUserId();
        this.userName = reservation.getUserName();
        this.year = reservation.getYear();
        this.month = reservation.getMonth();
        this.day = reservation.getDay();
        this.hour = reservation.getHour();
        this.sessionId = reservation.getSessionId();
        this.createdAt = reservation.getCreatedAt();
    }
}
