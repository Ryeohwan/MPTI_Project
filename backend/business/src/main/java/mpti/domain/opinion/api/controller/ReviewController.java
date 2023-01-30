package mpti.domain.opinion.api.controller;

import lombok.RequiredArgsConstructor;
import mpti.domain.opinion.api.request.CreateReviewRequest;
import mpti.domain.opinion.api.response.CreateReviewResponse;
import mpti.domain.opinion.api.response.GetReviewResponse;
import mpti.domain.opinion.application.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/opinion")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    // [GET] 현재 모든 리뷰 리스트 반환
    // Pageable

    @GetMapping("/review/list")
    public ResponseEntity<List<GetReviewResponse>> getReviewList() {

        List<GetReviewResponse> getReviewResponseList = reviewService.getReviewList();

        return ResponseEntity.ok(getReviewResponseList);
    }

    // [GET] 특정 회원이 작성한 리뷰 리스트 반환
    // Pageable

    @GetMapping("/review/list/{writerId}")
    public ResponseEntity<List<GetReviewResponse>> getReviewListByWriterId(@PathVariable Long writerId) {

        List<GetReviewResponse> getReviewByWriterIdResponseList = reviewService.getReviewListByWriterId(writerId);

        return ResponseEntity.ok(getReviewByWriterIdResponseList);
    }

    // [GET] 리뷰 상세 정보 반환
    @GetMapping("/review/{reviewId}")
    public ResponseEntity<Optional<GetReviewResponse>> getReview(@PathVariable Long reviewId) {

        Optional<GetReviewResponse> getReviewResponse = reviewService.getReview(reviewId);

        return ResponseEntity.ok(getReviewResponse);
    }

    // [GET] 회원이 리뷰 작성
    @PostMapping("/review/write")
    public ResponseEntity<Optional<CreateReviewResponse>> createReview(@RequestBody  CreateReviewRequest createReviewRequest){

        Long id = reviewService.create(createReviewRequest).getId();

        return ResponseEntity.ok(Optional.of(new CreateReviewResponse(id)));
    }

}
