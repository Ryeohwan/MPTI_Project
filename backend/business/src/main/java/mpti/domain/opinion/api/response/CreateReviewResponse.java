package mpti.domain.opinion.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CreateReviewResponse {

    private Long id;

    @Builder
    public CreateReviewResponse(Long id){
        this.id = id;
    }
}
