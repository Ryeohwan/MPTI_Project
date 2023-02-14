package mpti.domain.reservation.application;

import lombok.extern.slf4j.Slf4j;
import mpti.common.errors.ReservationNotFoundException;
import mpti.domain.opinion.entity.Review;
import mpti.domain.reservation.api.request.SchedulingRequest;
import mpti.domain.reservation.dao.ReservationRepository;
import mpti.domain.reservation.entity.Reservation;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.persistence.criteria.CriteriaBuilder;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;

@Transactional
@SpringBootTest
@Slf4j
class ReservationServiceTest {

    @Autowired
    ReservationService reservationService;

    @Autowired
    ReservationRepository reservationRepository;

    @Test
    @DisplayName("스케줄 생성")

    void openReservation(){
        Reservation reservationAt9 = createSampleReservation(9);

        Reservation savedReservation = reservationRepository.save(reservationAt9);

        Reservation findReservation = reservationRepository.findById(savedReservation.getId()).get();

        assertThat(reservationAt9.getTrainerId()).isEqualTo(findReservation.getTrainerId());
        assertThat(reservationAt9.getTrainerName()).isEqualTo(findReservation.getTrainerName());
        assertThat(reservationAt9.getYear()).isEqualTo(findReservation.getYear());
        assertThat(reservationAt9.getMonth()).isEqualTo(findReservation.getMonth());
        assertThat(reservationAt9.getDay()).isEqualTo(findReservation.getDay());
        assertThat(reservationAt9.getHour()).isEqualTo(findReservation.getHour());
        assertThat(findReservation.getCreatedAt()).isNotNull();
        assertThat(findReservation.getSessionId()).isNotNull();
    }

    @Test
    @DisplayName("스케줄 예약")
    void makeReservation() {
        Reservation reservationAt9 = createSampleReservation(9);

        reservationAt9.reserve(1L, "김회원");

        Reservation savedReservation = reservationRepository.save(reservationAt9);

        Reservation findReservation = reservationRepository.findById(savedReservation.getId()).get();

        assertThat(reservationAt9.getUserId()).isEqualTo(findReservation.getUserId());
        assertThat(reservationAt9.getUserName()).isEqualTo(findReservation.getUserName());

    }

    @Test
    @DisplayName("스케쥴 예약 취소")
    void cancelReservation() {
        Reservation reservationAt9 = createSampleReservation(9);

        reservationAt9.reserve(1L, "김회원");

        Reservation savedReservation = reservationRepository.save(reservationAt9);

        Reservation findReservation = reservationRepository.findById(savedReservation.getId()).get();

        findReservation.cancel();

        assertThat(findReservation.getUserId()).isNull();
        assertThat(findReservation.getUserName()).isNull();
    }

    @Test
    @DisplayName("스케줄 삭제")
    void deleteReservation() {
        Reservation reservationAt9 = createSampleReservation(9);

        reservationAt9.reserve(1L, "김회원");

        Reservation savedReservation = reservationRepository.save(reservationAt9);

        reservationRepository.delete(savedReservation);

        Optional<Reservation> findReservation = reservationRepository.findById(savedReservation.getId());

        assertThat(findReservation.isEmpty()).isTrue();
    }


    @Test
    @DisplayName("스케줄 수정(예약되지 않은 스케줄 삭제)")
    void schedulingDelete() throws IOException {
        // 있던 스케줄 삭제 case 1 : 아무도 예약하지 않은 스케줄 -> 삭제
        Reservation reservationAt9 = createSampleReservation(9);
        Reservation savedReservation = reservationRepository.save(reservationAt9);

        List<Integer> openHours = new ArrayList<>();
        openHours.add(10);

        reservationService.scheduling(SchedulingRequest.builder()
                        .trainerId(1L)
                        .trainerName("원쵸디")
                        .year(2022)
                        .month(2)
                        .day(2)
                        .openHours(openHours)
                        .build());

        log.info("zzzzzz");

        assertThatThrownBy(() -> reservationRepository.findById(savedReservation.getId()).orElseThrow(() -> new ReservationNotFoundException(savedReservation.getId())))
                .isInstanceOf(ReservationNotFoundException.class);

    }

    @Test
    @DisplayName("스케줄 수정(예약된 스케줄 삭제 불가)")
    void schedulingNoDelete() throws IOException {
        // 있던 스케줄 삭제 case 2 : 회원이 이미 예약한 스케줄 -> 삭제 불가
        Reservation reservationAt9 = createSampleReservation(9);
        reservationAt9.reserve(1L, "회원");
        Reservation savedReservation = reservationRepository.save(reservationAt9);

        List<Integer> openHours = new ArrayList<>();
        openHours.add(10);

        reservationService.scheduling(SchedulingRequest.builder()
                .trainerId(1L)
                .trainerName("원쵸디")
                .year(2022)
                .month(2)
                .day(2)
                .openHours(openHours)
                .build());

        Reservation findReservation = reservationRepository.findById(savedReservation.getId()).orElseThrow();

        assertThat(reservationAt9.getTrainerId()).isEqualTo(findReservation.getTrainerId());
        assertThat(reservationAt9.getTrainerName()).isEqualTo(findReservation.getTrainerName());
        assertThat(reservationAt9.getYear()).isEqualTo(findReservation.getYear());
        assertThat(reservationAt9.getMonth()).isEqualTo(findReservation.getMonth());
        assertThat(reservationAt9.getDay()).isEqualTo(findReservation.getDay());
        assertThat(reservationAt9.getHour()).isEqualTo(findReservation.getHour());
        assertThat(findReservation.getCreatedAt()).isNotNull();
        assertThat(findReservation.getSessionId()).isNotNull();


    }

    Reservation createSampleReservation(int hour){
        return Reservation.builder()
                .trainerId(1L)
                .trainerName("김트레이너")
                .year(2022)
                .month(2)
                .day(2)
                .hour(hour)
                .build();
    }
}