package mpti.domain.reservation.application;

import com.google.gson.Gson;
import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import mpti.common.errors.AlreadyReservedException;
import mpti.common.errors.IsNotSendersReservationException;
import mpti.common.errors.ReservationNotFoundException;
import mpti.common.errors.ServerCommunicationException;
import mpti.domain.opinion.dto.ReviewDto;
import mpti.domain.reservation.api.request.*;
import mpti.domain.opinion.entity.Role;
import mpti.domain.reservation.api.response.*;

import mpti.domain.reservation.dao.ReservationRepository;
import mpti.domain.reservation.dao.querydsl.ReservationQueryRepository;
import mpti.domain.reservation.dto.IdNameDto;
import mpti.domain.reservation.dto.YearMonthDayDto;
import mpti.domain.reservation.entity.Reservation;
import okhttp3.*;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ReservationService {

    private final ReservationRepository reservationRepository;

    private final ReservationQueryRepository reservationQueryRepository;

    public static final MediaType JSON = MediaType.get("application/json; charset=utf-8");
    private OkHttpClient client = new OkHttpClient();
    private final Gson gson;

    @Value("${server_url.getImageUrl}")
    private String getImageUrl;

    public List<GetReservationResponse> getReservationList() {

        List<Reservation> reservationList = reservationRepository.findAll();


        List<GetReservationResponse> getReservationResponseList = reservationList.stream()
                .map((reservation) -> new GetReservationResponse(reservation))
                .collect(Collectors.toList());
        return getReservationResponseList;
    }

    public List<GetReservationResponse> getReservationListByTrainerIdAndYearAndMonthAndDay(Long trainerId, int year, int month, int day) {

        List<Reservation> reservationList = reservationRepository.findAllByTrainerIdAndYearAndMonthAndDay(trainerId, year, month, day);

        List<GetReservationResponse> getReservationResponseList = reservationList.stream()
                .map((reservation) -> new GetReservationResponse(reservation))
                .collect(Collectors.toList());
        return getReservationResponseList;
    }

    public Page<GetReservationResponse> getReservationLPageByTrainerIdAndYearAndMonthAndDay(Long trainerId, int year, int month, int day, int page, int size, String orderType) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, orderType));

        Page<Reservation> reservationList = reservationRepository.findAllPageByTrainerIdAndYearAndMonthAndDay(trainerId, year, month, day, pageRequest);

        Page<GetReservationResponse> getReservationResponseList = reservationList
                .map((reservation) -> new GetReservationResponse(reservation));
//                .collect(Collectors.toList());
        return getReservationResponseList;
    }

    public Reservation get(Long id){
        return reservationRepository.findById(id).orElseThrow(() ->new ReservationNotFoundException(id));
    }

    public List<Long> makeReservation(MakeReservationRequest makeReservationRequest) throws IOException {

        List<Reservation> reservationList = reservationRepository.findByIdIn(makeReservationRequest.getIdList());

        List<Long> reservedReservationIdList = new ArrayList<>();

        for(Reservation reservation : reservationList){
            // 기존에 예약되지 않는 스케줄만 예약 가능
            if(reservation.getUserId() == null){
                reservation.reserve(makeReservationRequest.getUserId(), makeReservationRequest.getUserName());    /// getUserName으로 변경 필요
                reservedReservationIdList.add(reservation.getId());

            }else{
                throw new AlreadyReservedException(reservation.getId());
            }
        }

        return reservedReservationIdList;

    }

    public Optional<CancelReservationResponse> cancelReservation(CancelRequest cancelRequest){
        Reservation reservation = get(cancelRequest.getId());

        // 요청한 유저아이디와 예약된 유저아이디가 같아야지만 예약 취소 가능
        if(reservation.getUserId().equals(cancelRequest.getUserId())){
            reservation.cancel();
            return Optional.of(new CancelReservationResponse(reservation));
        }else{
            throw new IsNotSendersReservationException(reservation.getId());
        }

    }

    public void deleteReservation(Reservation reservation){
        reservationRepository.delete(reservation);
    }

    public void openReservation(Reservation reservation) throws IOException {

        GetImageUrlRequest getImageUrlRequest = new GetImageUrlRequest(reservation.getTrainerId());

        // DTO를 JSON으로 변환
        String json = gson.toJson(getImageUrlRequest);


        // RequestBody에 JSON 탑재
        RequestBody body = RequestBody.create(json, JSON);

//        Request request;

        Request request = new Request.Builder()
                .url(getImageUrl)
                .post(body)
                .build();

        // request 요청
        try (Response response = client.newCall(request).execute()) {
            // 요청 실패
            if (!response.isSuccessful()){
                throw new ServerCommunicationException();
            }else{

                String st = response.body().string();

                GetImageUrlResponse responseMember = gson.fromJson(st, GetImageUrlResponse.class);

                reservation.setImageUrl(responseMember.getImageUrl());

                reservationRepository.save(reservation);
            }
        }




    }

    public void scheduling(SchedulingRequest schedulingRequest) throws IOException {
        // 트레이너의 특정 날짜의 스케쥴을 불러온다.
        List<Reservation> reservationList = reservationRepository.findAllByTrainerIdAndYearAndMonthAndDay(
                schedulingRequest.getTrainerId(),
                schedulingRequest.getYear(),
                schedulingRequest.getMonth(),
                schedulingRequest.getDay());

        List<Integer> closeHours = new ArrayList<>();

        // 9 ~ 22시가 영업시간이라고 가정
        for(int i = 6; i<24; i++){
            // 운영 시간 중 오픈을 선택한 시간대가 아니라면 트레이너가 닫은 시간대이다.
            if(!schedulingRequest.getOpenHours().contains(i)){
                closeHours.add(i);
            }
        }

        // 기존 예약 현황
        List<Integer> original = new ArrayList<>();

        for(int i=0; i < reservationList.size(); i++) {
            Reservation reservation = reservationList.get(i);
            original.add(reservation.getHour());

            // 기존에 스케줄이 있었는데 트레이너가 이번에 닫은 일정이라면
            if(closeHours.contains(reservation.getHour())){

                // 해당 시간대를 어떤 회원도 신청하지 않은 경우에만 해당
                if(reservation.getUserId() == null){
                    deleteReservation(reservation);
                }

            }
        }

        // 기존에 없었는데 새로 연 스케줄은 추가
        for(int i=0; i<schedulingRequest.getOpenHours().size(); i++){

            int targetHour = schedulingRequest.getOpenHours().get(i);

            if(!original.contains(targetHour)){

                Reservation reservation = Reservation.builder()
                        .trainerId(schedulingRequest.getTrainerId())
                        .trainerName(schedulingRequest.getTrainerName())
                        .year(schedulingRequest.getYear())
                        .month(schedulingRequest.getMonth())
                        .day(schedulingRequest.getDay())
                        .hour(targetHour)
                        .build();

                openReservation(reservation);
            }
        }
    }

    public Set<GetIdSetResponse> getIdSet(Long id, Role role) {

//        List<Reservation> reservations;
        List<IdNameDto> idNameDtoList;
        Set<GetIdSetResponse> getIdListResponseSet = new HashSet<>();

        idNameDtoList = reservationQueryRepository.findDistinctIdListByTrainerIdOrUserIdByRole(id, role);
        for(IdNameDto idNameDto : idNameDtoList){
            Long idNameDtoId = idNameDto.getId();
            String idNameDtoName = idNameDto.getName();
            if(idNameDtoId != null){
                getIdListResponseSet.add(new GetIdSetResponse(idNameDtoId, idNameDtoName));
            }
        }

//        if(role.equals(Role.USER)){
//            reservations = reservationRepository.findByUserId(id);
//            for(Reservation reservation : reservations){
//                Long trainerId = reservation.getTrainerId();
//                String trainerName = reservation.getTrainerName();
//                if(trainerId != null){
//                    getIdListResponseSet.add(new GetIdSetResponse(trainerId, trainerName));
//                }
//            }
//        }else {
//            reservations = reservationRepository.findByTrainerId(id);
//            for(Reservation reservation : reservations){
//                Long userId = reservation.getUserId();
//                String userName = reservation.getUserName();
//                if(userId != null){
//                    getIdListResponseSet.add(new GetIdSetResponse(userId, userName));
//                }
//            }
//        }

        return getIdListResponseSet;
    }

    public List<GetReservationResponse> getReservationListByUserId(Long userId) {

        List<Reservation> reservationByUserId = reservationRepository.findByUserIdOrderByYearAscMonthAscDayAscHourAsc(userId);

        List<GetReservationResponse> getReservationResponseList = reservationByUserId.stream()
                .map((reservation) -> new GetReservationResponse(reservation))
                .collect(Collectors.toList());
        return getReservationResponseList;
    }

    public List<GetReservationResponse> getReservedReservationListByTrainerIdAndUserIdIsNotNull(Long trainerId) {

        List<Reservation> reservedReservationByTrainerId = reservationRepository.findAllByTrainerIdAndUserIdIsNotNull(trainerId);

        List<GetReservationResponse> getReservationResponseList = reservedReservationByTrainerId.stream()
                .map((reservation) -> new GetReservationResponse(reservation))
                .collect(Collectors.toList());

        return getReservationResponseList;
    }


    public List<GetReservationResponse> getReservationListByTrainerId(Long trainerId) {

        List<Reservation> reservationByTrainerId = reservationRepository.findByTrainerId(trainerId);

        List<GetReservationResponse> getReservationResponseList = reservationByTrainerId.stream()
                .map((reservation) -> new GetReservationResponse(reservation))
                .collect(Collectors.toList());

        return getReservationResponseList;
    }

    public List<GetAvailableReservationListByDateResponse> getAvailableReservationListByDate(String requestBody) {

        YearMonthDayDto yearMonthDayDto = gson.fromJson(requestBody, YearMonthDayDto.class);

        List<Long> reservationList = reservationRepository.findtrainerList(yearMonthDayDto.getYear(), yearMonthDayDto.getMonth(), yearMonthDayDto.getDay());


        List<GetAvailableReservationListByDateResponse> trainerList = new ArrayList<>();

        for (Long trainer_id : reservationList){
            trainerList.add(new GetAvailableReservationListByDateResponse(trainer_id));
        }

        return trainerList;
    }
}
