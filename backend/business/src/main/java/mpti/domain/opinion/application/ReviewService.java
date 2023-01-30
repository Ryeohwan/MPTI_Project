package mpti.domain.opinion.application;

import lombok.RequiredArgsConstructor;
import mpti.domain.opinion.api.request.CreateReviewRequest;
import mpti.domain.opinion.api.response.GetReviewResponse;
import mpti.domain.opinion.dao.ReviewRepository;
import mpti.domain.opinion.dto.ReviewDto;
import mpti.domain.opinion.entity.Review;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public List<GetReviewResponse> getReviewList() {
        List<Review> reviewList = reviewRepository.findAll();

        List<GetReviewResponse> getReviewResponse = reviewList.stream()
                .map((review) -> new GetReviewResponse(review))
                .collect(Collectors.toList());
        return getReviewResponse;
    }

    public List<GetReviewResponse> getReviewListByWriterId(Long writerId) {
        List<Review> reviewList = reviewRepository.findByWriterId(writerId);

        List<GetReviewResponse> getReviewResponse = reviewList.stream()
                .map((review) -> new GetReviewResponse(review))
                .collect(Collectors.toList());
        return getReviewResponse;
    }

    public ReviewDto create(CreateReviewRequest createReviewRequest) {
        Review review = new Review();
        review.setWriterId(createReviewRequest.getWriterId());
        review.setTargetId(createReviewRequest.getTargetId());
        review.setStar(createReviewRequest.getStar());
        review.setMemo(createReviewRequest.getMemo());

        Optional<Review> SavedReview = Optional.of(reviewRepository.save(review));

        ReviewDto reviewDto = new ReviewDto(SavedReview);

        return reviewDto;
    }

    public Optional<GetReviewResponse> getReview(Long id) {

        Optional<Review> review = reviewRepository.findById(id);

        Optional<GetReviewResponse> getReviewResponse = Optional.of(new GetReviewResponse(review.orElseThrow()));

        return getReviewResponse;
    }

}
