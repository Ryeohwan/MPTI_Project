package mpti.domain.opinion.api.controller;

import lombok.RequiredArgsConstructor;
import mpti.domain.opinion.api.request.CreateReportRequest;
import mpti.domain.opinion.api.request.ProcessReportRequest;
import mpti.domain.opinion.api.response.CreateReportResponse;
import mpti.domain.opinion.api.response.GetReportResponse;
import mpti.domain.opinion.api.response.ProcessReportResponse;
import mpti.domain.opinion.application.ReportService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/business/opinion")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;


    // [GET] 현재 모든 신고 리스트 반환
    // Pageable

    @GetMapping("/report/list/{page}")
    public ResponseEntity<Page<GetReportResponse>> getReportList(@PathVariable int page) {

        Page<GetReportResponse> getReportResponseList = reportService.getReportList(page, 8, "id");

        return ResponseEntity.ok(getReportResponseList);
    }

    // [POST] 신고 작성

    @PostMapping("/report/write")
    public ResponseEntity<Optional<CreateReportResponse>> createReport(@RequestBody CreateReportRequest createReportRequest){

        Long id = reportService.create(createReportRequest).getId();

        return ResponseEntity.ok(Optional.of(new CreateReportResponse(id)));
    }

    // [GET] 신고 상세 정보 반환
    // 예외(O) : [404 NOT FOUND] 해당 id의 신고 내역이 없는 경우

    @GetMapping("/report/{id}")
    public ResponseEntity<Optional<GetReportResponse>> getReport(@PathVariable Long id) {

        Optional<GetReportResponse> getReportResponse = reportService.getReport(id);

        return ResponseEntity.ok(getReportResponse);
    }

    // [GET] 신고 내역 처리
    // 예외(O) : [404 NOT FOUND] 해당 id의 신고 내역이 없는 경우(위와 동일한 예외)
    // 예외(O) : [404 NOT FOUND] 유저서버와 통신 중 예외 발생
    @PostMapping("/report/process")
    public ResponseEntity<Optional<ProcessReportResponse>> processReport(@RequestBody ProcessReportRequest processReportRequest) throws IOException {

        Optional<ProcessReportResponse> processReportResponse = reportService.process(processReportRequest);
        return ResponseEntity.ok(processReportResponse);
    }

}
