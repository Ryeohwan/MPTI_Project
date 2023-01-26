package mpti.domain.business.api.controller;

import lombok.RequiredArgsConstructor;


import mpti.domain.business.application.ReservationService;
import mpti.domain.business.entity.Reservation;
//import mpti.domain.business.mapper.ReservationDtoMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/reservation")
@RequiredArgsConstructor
public class ReservationController {

//    private final ReservationDtoMapper reservationDtoMapper;
//    private final MakeBasicResponse makeBasicResponse;
    private final ReservationService reservationService;



    // [GET] 현재 모든 예약(예약가능 + 예약 완료) 리스트 반환

    @GetMapping ("/list")
    public ResponseEntity<List<Reservation>> getReservations() {

        List<Reservation> reservations = reservationService.loadReservations();
//        List<ReservationDto> reservationDtos = reservations.map(reservationDtoMapper::toGetReservationResponse);

        return ResponseEntity.ok(reservations);
    }

    // [GET] 특정 트레이너의 특정 날짜의 예약 리스트를 반환
    @GetMapping ("/list/{id}/{year}/{month}/{day}")
    public ResponseEntity<List<Reservation>> getReservationsByTrainerAndDate(
            @PathVariable("id") Long trainerId,
            @PathVariable("year") int year,
            @PathVariable("month") int month,
            @PathVariable("day") int day){
        List<Reservation> reservations = reservationService.loadReservationsByTrainerAndDate(trainerId, year, month, day);
        return ResponseEntity.ok(reservations);
    }


    // [POST] 회원이 열려있는 예약중 특정한 하나를 예약

    @PostMapping("/reserve")
    public ResponseEntity<Long> makeReservation(Long reservationId, Long userId){

        Reservation reservation = reservationService.makeReservation(reservationId, userId);

        return ResponseEntity.ok(reservation.getId());
    }

//    [POST] 트레이너가 가능한 시간대를 선택 및 수정(회원이 이미 신청한 시간대는 변경 불가)

    @PostMapping("/scheduling")
    public ResponseEntity scheduling(@RequestParam Long trainerId,
                                     @RequestParam int year,
                                     @RequestParam int month,
                                     @RequestParam int day,
                                     @RequestParam List<Integer> openHours){

        reservationService.scheduling(trainerId, year, month, day, openHours);

        return ResponseEntity.ok("완료");
    }


//    [POST] 회원이 본인의 예약 취소
    @PostMapping("/cancel")
    public ResponseEntity cancel(@RequestParam Long reservationId,
                                 @RequestParam Long userId){
        Reservation reservation = reservationService.cancelReservation(reservationId, userId);
        return ResponseEntity.ok("완료");
    }



}
