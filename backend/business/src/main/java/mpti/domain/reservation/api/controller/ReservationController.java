package mpti.domain.reservation.api.controller;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import mpti.common.errors.AlreadyReservedException;
import mpti.domain.opinion.entity.Role;
import mpti.domain.reservation.api.request.CancelRequest;
import mpti.domain.reservation.api.request.MakeReservationRequest;
import mpti.domain.reservation.api.request.SchedulingRequest;
import mpti.domain.reservation.api.response.*;
import mpti.domain.reservation.application.ReservationService;
import mpti.domain.reservation.dto.ReservationDto;
import mpti.domain.reservation.dto.YearMonthDayDto;
import mpti.domain.reservation.entity.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@RestController
@RequestMapping("/api/business/reservation")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    private final Gson gson;

    // [GET] 현재 모든 예약(예약가능 + 예약 완료) 리스트 반환
    // Pageable

    @GetMapping ("/list")
    public ResponseEntity<List<GetReservationResponse>> getReservationList() {

        List<GetReservationResponse> getReservationResponseList = reservationService.getReservationList();

        return ResponseEntity.ok(getReservationResponseList);
    }


    // [GET] 특정 트레이너의 특정 날짜의 예약 리스트를 반환

    @GetMapping ("/list/{trainerId}/{year}/{month}/{day}")
    public ResponseEntity<List<GetReservationResponse>> getReservationListByTrainerIdAndYearAndMonthAndDay(
            @PathVariable("trainerId") Long trainerId,
            @PathVariable("year") int year,
            @PathVariable("month") int month,
            @PathVariable("day") int day){

        List<GetReservationResponse> getReservationResponseList = reservationService.getReservationListByTrainerIdAndYearAndMonthAndDay(trainerId, year, month, day);

        return ResponseEntity.ok(getReservationResponseList);
    }

    // [GET] 특정 트레이너의 특정 날짜의 예약 페이징 반환
    // Pageable

    @GetMapping ("/page/{trainerId}/{year}/{month}/{day}/{page}")
    public ResponseEntity<Page<GetReservationResponse>> getReservationPageByTrainerIdAndYearAndMonthAndDay(
            @PathVariable("trainerId") Long trainerId,
            @PathVariable("year") int year,
            @PathVariable("month") int month,
            @PathVariable("day") int day,
            @PathVariable int page){

        Page<GetReservationResponse> getReservationResponseList = reservationService.getReservationLPageByTrainerIdAndYearAndMonthAndDay(trainerId, year, month, day, page, 7, "id");

        return ResponseEntity.ok(getReservationResponseList);
    }


    // [POST] 회원이 열려있는 예약중 특정한 하나를 예약
    // 예외(O) : 이미 예약된 스케쥴에 예약을 시도한 경우

    @PostMapping("/reserve")
    public ResponseEntity<Optional<MakeReservationResponse>> makeReservation(@RequestBody MakeReservationRequest makeReservationRequest) throws IOException {

        List<Long> reservationDtoList = reservationService.makeReservation(makeReservationRequest);

        return ResponseEntity.ok(Optional.of(new MakeReservationResponse(reservationDtoList)));
    }


//    [POST] 트레이너가 가능한 시간대를 선택 및 수정(회원이 이미 신청한 시간대는 변경 불가)
    @PostMapping("/scheduling")
    public ResponseEntity<String> scheduling(@RequestBody SchedulingRequest schedulingRequest) throws IOException {

        reservationService.scheduling(schedulingRequest);

        return ResponseEntity.ok("스케줄링 완료");
    }


//    [POST] 회원이 본인의 예약 취소
//    예외(O) : 본인이 예약한 스케줄이 아닌 것을 취소 시도한 경우

    @PostMapping("/cancel")
    public ResponseEntity<Optional<CancelReservationResponse>> cancel(@RequestBody CancelRequest cancelRequest){

        Optional<CancelReservationResponse> cancelReservationResponse = reservationService.cancelReservation(cancelRequest);

        return ResponseEntity.ok(cancelReservationResponse);
    }


//    [GET] 본인과 관련된 상대방 리스트 조회
    @GetMapping("/id/list/{id}/{role}")
    public ResponseEntity<Set<GetIdSetResponse>> getIdSet(@PathVariable Long id, @PathVariable Role role){

        Set<GetIdSetResponse> getIdSetResponseSet = reservationService.getIdSet(id, role);

        return ResponseEntity.ok(getIdSetResponseSet);
    }

//    [GET 예약 상세보기
//    예외(O) : 없는 예약id를 요청한 경우

    @GetMapping("/{id}")
    public ResponseEntity<GetReservationResponse> getReservation(@PathVariable Long id){

        Reservation reservation = reservationService.get(id);

        return ResponseEntity.ok(new GetReservationResponse(reservation));
    }

    //    [GET] 회원이 본인의 예약 조회

    @GetMapping("/user/list/{userId}")
    public ResponseEntity<List<GetReservationResponse>> getReservationByUserId(@PathVariable Long userId){

        List<GetReservationResponse> getReservationResponseList = reservationService.getReservationListByUserId(userId);

        return ResponseEntity.ok(getReservationResponseList);
    }


    //    [GET] 트레이너가 본인을 예약한 유저와 스케줄 조회

    @GetMapping("/trainer/reserved/list/{trainerId}")
    public ResponseEntity<List<GetReservationResponse>> getReservedReservationByTrainerId(@PathVariable Long trainerId){

        List<GetReservationResponse> getReservationResponseList = reservationService.getReservedReservationListByTrainerIdAndUserIdIsNotNull(trainerId);

        return ResponseEntity.ok(getReservationResponseList);
    }

    //    [GET] 특정 트레이너의 모든 스케쥴 조회

    @GetMapping("/trainer/list/{trainerId}")
    public ResponseEntity<List<GetReservationResponse>> getReservationByTrainerId(@PathVariable Long trainerId){

        List<GetReservationResponse> getReservationResponseList = reservationService.getReservationListByTrainerId(trainerId);

        return ResponseEntity.ok(getReservationResponseList);
    }


//    [POST] 년-월-일로 예약 가능한 트레이너 ID 리스트 조회

    @PostMapping("/trainer/available/list")
    public ResponseEntity<List<GetAvailableReservationListByDateResponse>> getAvailableReservationListByDate(@RequestBody String requestBody){

        List<GetAvailableReservationListByDateResponse> getReservationResponseList = reservationService.getAvailableReservationListByDate(requestBody);


        return ResponseEntity.ok(getReservationResponseList);
    }

}
