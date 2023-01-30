package mpti.domain.reservation.api.response;

import lombok.Getter;

@Getter
public class MakeReservationResponse {

    private Long id;

    public MakeReservationResponse(Long id) {
        this.id = id;
    }
}
