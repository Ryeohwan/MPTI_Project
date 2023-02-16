package mpti.domain.opinion.dto;

import lombok.Getter;
import mpti.domain.opinion.entity.Review;

import java.time.LocalDateTime;
import java.util.Optional;

@Getter
public class ReviewDto {

    private Long id;

    private Long writerId;

    private Long targetId;

    private String writerName;

    private String targetName;

    private LocalDateTime createdAt;

    private int star;

    private String memo;


    public ReviewDto(Optional<Review> review){
        this.id = review.orElseThrow().getId();
        this.writerId = review.orElseThrow().getWriterId();
        this.targetId = review.orElseThrow().getTargetId();
        this.createdAt = review.orElseThrow().getCreatedAt();
        this.memo = review.orElseThrow().getMemo();
        this.star = review.orElseThrow().getStar();
    }
}
