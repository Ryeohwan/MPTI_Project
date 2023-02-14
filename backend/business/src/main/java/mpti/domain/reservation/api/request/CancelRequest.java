package mpti.domain.reservation.api.request;

import lombok.Getter;

@Getter
public class CancelRequest {

    private Long id;

    private Long userId;
}
