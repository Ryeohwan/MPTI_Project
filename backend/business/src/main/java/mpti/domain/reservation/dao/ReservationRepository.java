package mpti.domain.reservation.dao;

import mpti.domain.reservation.entity.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findAllByTrainerIdAndYearAndMonthAndDay(Long trainerId, int year, int month, int day);

    List<Reservation> findByUserIdOrderByYearAscMonthAscDayAscHourAsc(Long userId);

    List<Reservation> findByTrainerId(Long trainerId);

//    List<Reservation> findByUserId(Long userId);

    List<Reservation> findAllByTrainerIdAndUserIdIsNotNull(Long trainerId);

    Page<Reservation> findAllPageByTrainerIdAndYearAndMonthAndDay(Long trainerId, int year, int month, int day, PageRequest pageRequest);

    List<Reservation> findByIdIn(List<Long> idList);

    @Query("select distinct r.trainerId from Reservation r where r.year= :year and r.month = :month and r.day = :day")
    List<Long> findtrainerList(@Param("year") int year, @Param("month") int month, @Param("day") int day);

//    List<Reservation> findAllByTrainerId(Long trainerId);
}
