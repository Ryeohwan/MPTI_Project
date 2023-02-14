package mpti.domain.opinion.application;

import lombok.RequiredArgsConstructor;
import mpti.common.errors.ReviewNotFoundException;
import mpti.domain.opinion.api.request.CreateReviewRequest;
import mpti.domain.opinion.api.response.GetReviewResponse;
import mpti.domain.opinion.dao.ReviewRepository;
import mpti.domain.opinion.dto.ReviewDto;
import mpti.domain.opinion.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

    public Page<GetReviewResponse> getReviewList(int page, int size, String orderType) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, orderType));

        Page<Review> reviewList = reviewRepository.findAll(pageRequest);

        Page<GetReviewResponse> getReviewResponse = reviewList
                .map((review) -> new GetReviewResponse(review));
//                .collect(Collectors.toList());
        return getReviewResponse;
    }

    public Page<GetReviewResponse> getTrainerReviewList(Long trainerId, int page, int size, String orderType) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, orderType));

        Page<Review> reviewList = reviewRepository.findAllByTargetId(trainerId, pageRequest);

        Page<GetReviewResponse> getReviewResponse = reviewList
                .map((review) -> new GetReviewResponse(review));
//                .collect(Collectors.toList());
        return getReviewResponse;
    }

    public Page<GetReviewResponse> getReviewListByWriterId(Long writerId, int page, int size, String orderType) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, orderType));

        Page<Review> reviewList = reviewRepository.findByWriterId(writerId, pageRequest);

        Page<GetReviewResponse> getReviewResponse = reviewList
                .map((review) -> new GetReviewResponse(review));
//                .collect(Collectors.toList());
        return getReviewResponse;
    }

    public ReviewDto create(CreateReviewRequest createReviewRequest) {
        Review review = Review.builder()
                .writerId(createReviewRequest.getWriterId())
                .writerName(createReviewRequest.getWriterName())
                .targetId(createReviewRequest.getTargetId())
                .targetName(createReviewRequest.getTargetName())
                .memo(createReviewRequest.getMemo())
                .star(createReviewRequest.getStar())
                .build();

        Optional<Review> SavedReview = Optional.of(reviewRepository.save(review));

        ReviewDto reviewDto = new ReviewDto(SavedReview);

        return reviewDto;
    }

    public Optional<GetReviewResponse> getReview(Long id) {

        Review review = reviewRepository.findById(id).orElseThrow(() -> new ReviewNotFoundException(id));

        Optional<GetReviewResponse> getReviewResponse = Optional.of(new GetReviewResponse(review));

        return getReviewResponse;
    }


}
