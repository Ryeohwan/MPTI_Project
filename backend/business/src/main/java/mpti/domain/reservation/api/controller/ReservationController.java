package mpti.domain.reservation.api.controller;

import lombok.RequiredArgsConstructor;
import mpti.domain.reservation.api.request.CancelRequest;
import mpti.domain.reservation.api.request.MakeReservationRequest;
import mpti.domain.reservation.api.request.SchedulingRequest;
import mpti.domain.reservation.api.response.GetReservationResponse;
import mpti.domain.reservation.api.response.MakeReservationResponse;
import mpti.domain.reservation.application.ReservationService;
import mpti.domain.reservation.dto.ReservationDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/reservation")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;


    // [GET] 현재 모든 예약(예약가능 + 예약 완료) 리스트 반환
    // Pageable

    @GetMapping ("/list")
    public ResponseEntity<List<GetReservationResponse>> getReservationList() {

        List<GetReservationResponse> getReservationResponseList = reservationService.getReservationList();

        return ResponseEntity.ok(getReservationResponseList);
    }

    // [GET] 특정 트레이너의 특정 날짜의 예약 리스트를 반환
    // Pageable

    @GetMapping ("/list/{id}/{year}/{month}/{day}")
    public ResponseEntity<List<GetReservationResponse>> getReservationListByTrainerIdAndYearAndMonthAndDay(
            @PathVariable("id") Long trainerId,
            @PathVariable("year") int year,
            @PathVariable("month") int month,
            @PathVariable("day") int day){

        List<GetReservationResponse> getReservationResponseList = reservationService.getReservationListByTrainerIdAndYearAndMonthAndDay(trainerId, year, month, day);

        return ResponseEntity.ok(getReservationResponseList);
    }


    // [POST] 회원이 열려있는 예약중 특정한 하나를 예약

    @PostMapping("/reserve")
    public ResponseEntity<Optional<MakeReservationResponse>> makeReservation(@RequestBody MakeReservationRequest makeReservationRequest){

        Long id = reservationService.makeReservation(makeReservationRequest).orElseThrow().getId();

        return ResponseEntity.ok(Optional.of(new MakeReservationResponse(id)));
    }

//    [POST] 트레이너가 가능한 시간대를 선택 및 수정(회원이 이미 신청한 시간대는 변경 불가)

    @PostMapping("/scheduling")
    public ResponseEntity scheduling(@RequestBody SchedulingRequest schedulingRequest){

        reservationService.scheduling(schedulingRequest);

        return ResponseEntity.ok("스케줄링 완료");
    }


//    [POST] 회원이 본인의 예약 취소
    @PostMapping("/cancel")
    public ResponseEntity<Optional<ReservationDto>> cancel(@RequestBody CancelRequest cancelRequest){

        Optional<ReservationDto> reservationDto = reservationService.cancelReservation(cancelRequest);

        return ResponseEntity.ok(reservationDto);
    }



}
