package mpti.domain.reservation.api.request;

import lombok.Getter;

@Getter
public class GetImageUrlRequest {

    private Long id;

    public GetImageUrlRequest(Long id) {
        this.id = id;
    }
}
