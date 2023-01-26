package mpti.domain.business.api.controller;

import lombok.RequiredArgsConstructor;
import mpti.domain.business.application.OpinionService;
import mpti.domain.business.entity.Report;
import mpti.domain.business.entity.Review;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;

@RestController
@RequestMapping("/opinion")
@RequiredArgsConstructor
public class OpinionController {

    private final OpinionService opinionService;

    // [GET] 현재 모든 리뷰 리스트 반환

    @GetMapping("/review/list")
    public ResponseEntity<List<Review>> getReviews() {

        List<Review> reviews = opinionService.loadReviews();

        return ResponseEntity.ok(reviews);
    }

    // [GET] 특정 회원이 작성한 모든 리뷰 리스트 반환
    @GetMapping("/review/list/{userId}")
    public ResponseEntity<List<Review>> getReviewsByUserId(@PathVariable Long userId) {
        System.out.println("특정 유저 리뷰 컨트롤러");
        List<Review> reviews = opinionService.loadReviewsByUserId(userId);

        return ResponseEntity.ok(reviews);
    }

    // [GET] 리뷰 상세 정보 반환
    @GetMapping("/review/detail/{reviewId}")
    public ResponseEntity<Optional<Review>> getReviewDetail(@PathVariable Long reviewId) {

        Optional<Review> review = opinionService.loadReviewDetail(reviewId);

        return ResponseEntity.ok(review);
    }

    // [GET] 회원이 리뷰 작성
    @PostMapping("/review/write")
    public ResponseEntity writeReview(@RequestParam Long userId,
                                      @RequestParam Long trainerId,
                                      @RequestParam Double star,
                                      @RequestParam String memo){
        opinionService.writeReview(userId, trainerId, star, memo);

        return ResponseEntity.ok("완료");
    }



    // [GET] 현재 모든 신고 리스트 반환

    @GetMapping("/report/list")
    public ResponseEntity<List<Report>> getReports() {

        List<Report> reports = opinionService.loadReports();

        return ResponseEntity.ok(reports);
    }

    // [GET] 신고 작성

    @PostMapping("/report/write")
    public ResponseEntity writeReport(@RequestParam Long userId,
                                      @RequestParam Long trainerId,
                                      @RequestParam String memo){
        opinionService.writeReport(userId, trainerId, memo);

        return ResponseEntity.ok("완료");
    }

    // [GET] 신고 상세 정보 반환

    @GetMapping("/report/detail/{reportId}")
    public ResponseEntity<Report> getReport(@PathVariable Long reportId) {

        Report report = opinionService.loadReport(reportId);

        return ResponseEntity.ok(report);
    }

    // [GET] 신고 내역 처리

    @PostMapping("/report/process")
    public ResponseEntity processReport(@RequestParam Long reportId,
                                        @RequestParam int blockPeriod) {

        LocalDateTime stopUntil = opinionService.processReport(reportId, blockPeriod);

        // 여기서 유저 테이블로 계정정지종료일(stopUntil) 전송 필요

        return ResponseEntity.ok("완료");
    }
}
