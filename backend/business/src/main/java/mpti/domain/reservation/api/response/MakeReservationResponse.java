package mpti.domain.reservation.api.response;

import lombok.Getter;

import java.util.List;

@Getter
public class MakeReservationResponse {

    private List<Long> idList;

    public MakeReservationResponse(List<Long> idList) {
        this.idList = idList;
    }
}
