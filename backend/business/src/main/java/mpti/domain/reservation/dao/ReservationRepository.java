package mpti.domain.reservation.dao;

import mpti.domain.reservation.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {


    List<Reservation> findAllByTrainerIdAndYearAndMonthAndDay(Long trainerId, int year, int month, int day);
}
