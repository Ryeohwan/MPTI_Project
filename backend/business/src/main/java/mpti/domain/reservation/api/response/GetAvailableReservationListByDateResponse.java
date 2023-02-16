package mpti.domain.reservation.api.response;

import lombok.Getter;

@Getter
public class GetAvailableReservationListByDateResponse {

    private Long id;

    public GetAvailableReservationListByDateResponse(Long id) {
        this.id = id;
    }
}
