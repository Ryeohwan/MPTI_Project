package mpti.domain.opinion.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

@Entity
@DiscriminatorValue("review")
@Getter
@Setter
public class Review extends Opinion{

    private int star;


    public Review() {
    }

    @Builder
    public Review(Long writerId, Long targetId, String writerName, String targetName, String memo, int star) {
        super(writerId, targetId, writerName, targetName, memo);
        this.star = star;
    }
}