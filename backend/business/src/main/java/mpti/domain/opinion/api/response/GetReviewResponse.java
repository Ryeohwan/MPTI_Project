package mpti.domain.opinion.api.response;

import lombok.Getter;
import mpti.domain.opinion.entity.Review;

import java.time.LocalDateTime;

@Getter
public class GetReviewResponse {

    private Long id;

    private Long writerId;

    private Long targetId;

    private String writerName;

    private String targetName;

    private String memo;

    private LocalDateTime createdAt;

    private int star;

    public GetReviewResponse(Review review) {
        this.id = review.getId();
        this.writerId = review.getWriterId();
        this.targetId = review.getTargetId();
        this.writerName = review.getWriterName();
        this.targetName = review.getTargetName();
        this.memo = review.getMemo();
        this.createdAt = review.getCreatedAt();
        this.star = review.getStar();
    }
}
