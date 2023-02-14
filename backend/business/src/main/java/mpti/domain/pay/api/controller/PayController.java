package mpti.domain.pay.api.controller;

import lombok.extern.slf4j.Slf4j;
import mpti.domain.pay.api.request.PayCompletedRequest;
import mpti.domain.pay.api.request.PayReadyRequest;
import mpti.domain.pay.application.KakaoPayService;
import mpti.domain.pay.api.response.ApproveResponse;
import mpti.domain.pay.api.response.ReadyResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/business/pay")
@CrossOrigin("http://localhost:8080")
@Slf4j
public class PayController {

    @Autowired
    KakaoPayService kakaopayService;

    private String tid;

    // 카카오페이결제 요청
    @PostMapping("/order/request")
    public ResponseEntity<ReadyResponse> payReady(@RequestBody PayReadyRequest payReadyRequest)  throws IOException {

        log.info("order/pay start");

        // 카카오 결제 준비하기	- 결제요청 service 실행.
        ReadyResponse readyResponse = kakaopayService.payReady(payReadyRequest.getTotalAmount());
        tid = readyResponse.getTid();

        return ResponseEntity.ok(readyResponse); // 클라이언트에 보냄.(tid,next_redirect_pc_url이 담겨있음.)
    }

    // 결제승인요청
    @PostMapping("/order/completed")
    public ResponseEntity<ApproveResponse> payCompleted(@RequestBody PayCompletedRequest payCompletedRequest) {

        log.info("order/completed start");

        log.info("pgToken = {}", payCompletedRequest.getPgToken());
        log.info("tid = {}", tid);

        // 카카오 결재 요청하기
        ApproveResponse approveResponse = kakaopayService.payApprove(tid, payCompletedRequest.getPgToken());

        return ResponseEntity.ok(approveResponse);
    }

    // 결제 취소시 실행 url
    @GetMapping("/order/pay/cancel")
    public String payCancel() {
        return "redirect:/carts";
    }

    // 결제 실패시 실행 url
    @GetMapping("/order/pay/fail")
    public String payFail() {
        return "redirect:/carts";
    }


}
