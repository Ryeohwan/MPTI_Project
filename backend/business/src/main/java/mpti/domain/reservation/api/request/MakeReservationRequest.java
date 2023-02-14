package mpti.domain.reservation.api.request;

import lombok.Getter;

import java.util.List;

@Getter
public class MakeReservationRequest {

    private List<Long> idList;

    private Long userId;

    private String userName;
}
