package mpti.domain.opinion.api.request;

import lombok.Getter;

@Getter
public class CreateReviewRequest {

    private Long writerId;

    private Long targetId;

    private String writerName;

    private String targetName;

    private int star;

    private String memo;

}
