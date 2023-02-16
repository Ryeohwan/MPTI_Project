package mpti.domain.opinion.api.controller;

import lombok.RequiredArgsConstructor;
import mpti.domain.opinion.api.request.CreateReviewRequest;
import mpti.domain.opinion.api.request.DeleteReviewRequest;
import mpti.domain.opinion.api.response.CreateReviewResponse;
import mpti.domain.opinion.api.response.GetReviewResponse;
import mpti.domain.opinion.application.ReviewService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/business/opinion")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    // [GET] 현재 모든 리뷰 리스트 반환
    // Pageable

    @GetMapping("/review/list/{page}")
    public ResponseEntity<Page<GetReviewResponse>> getReviewList(@PathVariable int page) {

        Page<GetReviewResponse> getReviewResponseList = reviewService.getReviewList(page, 5, "id");

        return ResponseEntity.ok(getReviewResponseList);
    }

    // [GET] 특정 트레이너의 리뷰 리스트 조회
    // Pageable

    @GetMapping("/review/trainer/list/{trainerId}/{page}")
    public ResponseEntity<Page<GetReviewResponse>> getTrainerReviewList(@PathVariable Long trainerId, @PathVariable int page) {

        Page<GetReviewResponse> getReviewResponseList = reviewService.getTrainerReviewList(trainerId, page, 5, "id");

        return ResponseEntity.ok(getReviewResponseList);
    }

    // [GET] 특정 회원이 작성한 리뷰 리스트 반환
    // Pageable
    @GetMapping("/review/user/list/{writerId}/{page}")
    public ResponseEntity<Page<GetReviewResponse>> getReviewListByWriterId(@PathVariable Long writerId, @PathVariable int page) {

        Page<GetReviewResponse> getReviewByWriterIdResponseList = reviewService.getReviewListByWriterId(writerId, page, 5, "id");

        return ResponseEntity.ok(getReviewByWriterIdResponseList);
    }

    // [GET] 리뷰 상세 정보 반환
    // 예외(O) : 해당 id의 리뷰가 없는 경우
    @GetMapping("/review/{reviewId}")
    public ResponseEntity<Optional<GetReviewResponse>> getReview(@PathVariable Long reviewId) {

        Optional<GetReviewResponse> getReviewResponse = reviewService.getReview(reviewId);

        return ResponseEntity.ok(getReviewResponse);
    }

    // [GET] 회원이 리뷰 작성
    @PostMapping("/review/write")
    public ResponseEntity<Optional<CreateReviewResponse>> createReview(@RequestBody  CreateReviewRequest createReviewRequest) throws IOException {

        Long id = reviewService.create(createReviewRequest).getId();

        return ResponseEntity.ok(Optional.of(new CreateReviewResponse(id)));
    }

    // [POST] 회원 리뷰 삭제
    @PostMapping("/review/delete")
    public ResponseEntity<String> deleteReview(@RequestBody DeleteReviewRequest deleteReviewRequest){

        reviewService.delete(deleteReviewRequest);

        return ResponseEntity.ok("삭제 성공");
    }


}
