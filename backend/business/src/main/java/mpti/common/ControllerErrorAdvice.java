package mpti.common;

import mpti.common.errors.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerErrorAdvice {


    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ReportNotFoundException.class)
    public ErrorResponse handleReportNotFoundException(){
        return new ErrorResponse("해당 신고가 없습니다.");
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ReviewNotFoundException.class)
    public ErrorResponse handleReviewNotFoundException(){
        return new ErrorResponse("해당 리뷰가 없습니다.");
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ReservationNotFoundException.class)
    public ErrorResponse handleReservationNotFoundException(){
        return new ErrorResponse("해당 스케줄이 없습니다.");
    }


    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(ServerCommunicationException.class)
    public ErrorResponse handleServerCommunicationException(){
        return new ErrorResponse("서버 내부 통신 중 요류가 발생했습니다.");
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(AlreadyReservedException.class)
    public ErrorResponse handleAlreadyReservedException(){
        return new ErrorResponse("이미 예약된 스케줄입니다.");
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(IsNotSendersReservationException.class)
    public ErrorResponse handleIsNotSendersReservationException(){
        return new ErrorResponse("해당 스케줄은 본인이 예약한 스케줄이 아닙니다.");
    }


}
