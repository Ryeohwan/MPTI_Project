package mpti.domain.opinion.api.controller;

import lombok.RequiredArgsConstructor;
import mpti.domain.opinion.api.request.CreateReportRequest;
import mpti.domain.opinion.api.request.ProcessReportRequest;
import mpti.domain.opinion.api.response.CreateReportResponse;
import mpti.domain.opinion.api.response.GetReportResponse;
import mpti.domain.opinion.api.response.ProcessReportResponse;
import mpti.domain.opinion.application.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/opinion")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;


    // [GET] 현재 모든 신고 리스트 반환
    // Pageable

    @GetMapping("/report/list")
    public ResponseEntity<List<GetReportResponse>> getReportList() {

        List<GetReportResponse> getReportResponseList = reportService.getReportList();

        return ResponseEntity.ok(getReportResponseList);
    }

    // [GET] 신고 작성

    @PostMapping("/report/write")
    public ResponseEntity<Optional<CreateReportResponse>> createReport(@RequestBody CreateReportRequest createReportRequest){

        Long id = reportService.create(createReportRequest).getId();

        return ResponseEntity.ok(Optional.of(new CreateReportResponse(id)));
    }

    // [GET] 신고 상세 정보 반환

    @GetMapping("/report/{id}")
    public ResponseEntity<Optional<GetReportResponse>> getReport(@PathVariable Long id) {

        Optional<GetReportResponse> getReportResponse = reportService.getReport(id);

        return ResponseEntity.ok(getReportResponse);
    }

    // [GET] 신고 내역 처리

    @PostMapping("/report/process")
    public ResponseEntity<Optional<ProcessReportResponse>> processReport(@RequestBody ProcessReportRequest processReportRequest) {

        Optional<ProcessReportResponse> processReportResponse = reportService.process(processReportRequest);

        // 여기서 유저 테이블로 계정정지종료일(stopUntil) 전송 필요

        return ResponseEntity.ok(processReportResponse);
    }
}
