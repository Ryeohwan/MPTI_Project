package mpti.domain.opinion.api.request;

import lombok.Getter;

@Getter
public class CreateReviewRequest {

    private Long writerId;

    private Long targetId;

    private Double star;

    private String memo;

}
