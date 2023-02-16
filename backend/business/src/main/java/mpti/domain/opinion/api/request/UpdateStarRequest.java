package mpti.domain.opinion.api.request;

import lombok.Getter;

@Getter
public class UpdateStarRequest {

    private Long id;

    private int star;

    public UpdateStarRequest(Long id, int star) {
        this.id = id;
        this.star = star;
    }
}
