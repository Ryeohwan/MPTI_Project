package mpti.domain.opinion.application;

import mpti.domain.opinion.dao.ReviewRepository;
import mpti.domain.opinion.entity.Report;
import mpti.domain.opinion.entity.Review;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@Transactional
@SpringBootTest
class ReviewServiceTest {

    @Autowired
    ReviewRepository reviewRepository;

    @Test
    @DisplayName("리뷰 작성")
    void create() {
        Review review = createSampleReview();

        Review savedReview = reviewRepository.save(review);

        Review findReview = reviewRepository.findById(savedReview.getId()).get();

        assertThat(review.getWriterId()).isEqualTo(findReview.getWriterId());
        assertThat(review.getWriterName()).isEqualTo(findReview.getWriterName());
        assertThat(review.getTargetId()).isEqualTo(findReview.getTargetId());
        assertThat(review.getTargetName()).isEqualTo(findReview.getTargetName());
        assertThat(review.getMemo()).isEqualTo(findReview.getMemo());
        assertThat(review.getStar()).isEqualTo(findReview.getStar());
        assertThat(findReview.getCreatedAt()).isNotNull();
    }

    Review createSampleReview(){
        return Review.builder()
                .writerId(1L)
                .writerName("작성자")
                .targetId(2L)
                .targetName("박트레이너")
                .memo("박트레이너님 매우 잘 가르치시네요.")
                .star(5.0)
                .build();
    }
}