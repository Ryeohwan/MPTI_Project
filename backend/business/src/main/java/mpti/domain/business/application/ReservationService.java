package mpti.domain.business.application;

import lombok.RequiredArgsConstructor;
//import mpti.domain.business.api.response.ReservationDto;
import mpti.domain.business.dao.ReservationRepository;
import mpti.domain.business.entity.Reservation;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ReservationService {

    private final ReservationRepository reservationRepository;


    public List<Reservation> loadReservations() {
        List<Reservation> reservation = reservationRepository.findAll();
        return reservation;
    }

    public List<Reservation> loadReservationsByTrainerAndDate(Long trainerId, int year, int month, int day) {
        List<Reservation> reservation = reservationRepository.findAllByTrainerAndDate(trainerId, year, month, day);
        return reservation;
    }

    public Reservation makeReservation(Long reservationId, Long userId) {
        Reservation reservation = reservationRepository.findOne(reservationId);
        reservation.reserve(userId);
        return reservation;
    }

    public Reservation cancelReservation(Long reservationId, Long userId){
        Reservation reservation = reservationRepository.findOne(reservationId);

        // 요청한 유저아이디와 예약된 유저아이디가 같아야지만 예약 취소 가능
        if(reservation.getUserId() == userId){
            reservation.cancel();
        }

        return reservation;
    }

    public void deleteReservation(Reservation reservation){
        reservationRepository.delete(reservation);
    }

    public void openReservation(Reservation reservation) {
        reservationRepository.saveSchedule(reservation);
    }

    public void scheduling(Long trainerId, int year, int month, int day, List<Integer> openHours){
        // 트레이너의 특정 날짜의 스케쥴을 불러온다.
        List<Reservation> reservations = this.loadReservationsByTrainerAndDate(trainerId, year, month, day);


        List<Integer> closeHours = new ArrayList<>();

        // 9 ~ 22시가 영업시간이라고 가정
        for(int i = 9; i<22; i++){
            // 운영 시간 중 오픈을 선택한 시간대가 아니라면 트레이너가 닫은 시간대이다.
            if(!openHours.contains(i)){
                closeHours.add(i);
            }
        }

        // 기존 예약 현황
        List<Integer> original = new ArrayList<>();

        for(int i=0; i < reservations.size(); i++) {
            Reservation reservation = reservations.get(i);
            original.add(reservation.getHour());

            // 기존에 스케줄이 있었는데 트레이너가 이번에 닫은 일정이라면
            if(closeHours.contains(reservation.getHour())){
                // 해당 시간대를 어떤 회원도 신청하지 않은 경우에만 해당
                if(reservation.getUserId() == null){
                    this.deleteReservation(reservation);
                }

            }
        }

        // 기존에 없었는데 새로 연 스케줄은 추가
        for(int i=0; i<openHours.size(); i++){
            int targetHour = openHours.get(i);
            if(!original.contains(targetHour)){
                Reservation reservation = new Reservation(trainerId, year, month, day, targetHour);
                this.openReservation(reservation);
            }
        }
    }
}
