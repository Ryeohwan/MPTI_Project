package mpti.domain.pay.application;

import lombok.extern.slf4j.Slf4j;
import mpti.domain.pay.api.response.ApproveResponse;
import mpti.domain.pay.api.response.ReadyResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Service
@Slf4j
public class KakaoPayService {

    @Value("${app.kakao.adminKey}")
    private String kakao_adminKey;

    public ReadyResponse payReady(int totalAmount) throws IOException {

        String order_id = "1111";
        String itemName = "호갱용 PT 1회권";
        Integer quantity = 1;


        // 카카오가 요구한 결제요청request값을 담아줍니다.
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<String, String>();
        parameters.add("cid", "TC0ONETIME");
        parameters.add("partner_order_id", order_id);
        parameters.add("partner_user_id", "ssafy");
        parameters.add("item_name", itemName);
        parameters.add("quantity", String.valueOf(quantity));
        parameters.add("total_amount", String.valueOf(totalAmount));
        parameters.add("tax_free_amount", "0");
//        parameters.add("approval_url", "https://i8a803.p.ssafy.io/clientmyreservation"); // 결제승인시 넘어갈 url
        parameters.add("approval_url", "http://localhost:9999/order"); // 결제승인시 넘어갈 url
        parameters.add("cancel_url", "http://localhost:9999/order/pay/cancel"); // 결제취소시 넘어갈 url
        parameters.add("fail_url", "http://localhost:9999/order/pay/fail"); // 결제 실패시 넘어갈 url


        RestTemplate template = new RestTemplate();

        String url = "https://kapi.kakao.com/v1/payment/ready";

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        ReadyResponse readyResponse = template.postForObject(url, requestEntity, ReadyResponse.class);


        return readyResponse;
    }

    // 결제 승인요청 메서드
    public ApproveResponse payApprove(String tid, String pgToken) {

        String order_id = "1111";

        // request값 담기.
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<String, String>();
        parameters.add("cid", "TC0ONETIME");
        parameters.add("tid", tid);
        parameters.add("partner_order_id", order_id); // 주문명
        parameters.add("partner_user_id", "ssafy");
        parameters.add("pg_token", pgToken);


        // 하나의 map안에 header와 parameter값을 담아줌.
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부url 통신
        RestTemplate template = new RestTemplate();
        String url = "https://kapi.kakao.com/v1/payment/approve";
        // 보낼 외부 url, 요청 메시지(header,parameter), 처리후 값을 받아올 클래스.
        ApproveResponse approveResponse = template.postForObject(url, requestEntity, ApproveResponse.class);
//        log.info("결재승인 응답객체: " + approveResponse);

        log.info("approveResponse = {}",  approveResponse);

        return approveResponse;
    }
    // header() 셋팅
    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + kakao_adminKey);
        headers.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        return headers;
    }
}