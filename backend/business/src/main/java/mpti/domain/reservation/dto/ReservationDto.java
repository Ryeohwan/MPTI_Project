package mpti.domain.reservation.dto;

import lombok.Getter;
import mpti.domain.reservation.entity.Reservation;

import java.time.LocalDateTime;
import java.util.Optional;

@Getter
public class ReservationDto {

    private Long id;

    private Long trainerId;

    private Long userId;

    private int year, month, day, hour;

    private LocalDateTime createdAt;

    public ReservationDto(Optional<Reservation> reservation) {
        this.id = reservation.orElseThrow().getId();
        this.trainerId = reservation.orElseThrow().getTrainerId();
        this.userId = reservation.orElseThrow().getUserId();
        this.year = reservation.orElseThrow().getYear();
        this.month = reservation.orElseThrow().getMonth();
        this.day = reservation.orElseThrow().getDay();
        this.hour = reservation.orElseThrow().getHour();
        this.createdAt = reservation.orElseThrow().getCreatedAt();
    }
}
