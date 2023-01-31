package mpti.domain.trainer.api.controller;


import mpti.common.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/trainer")
public class TrainerController {

    @GetMapping("/test")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<?> test(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        System.out.println(userPrincipal.getEmail());
        return ResponseEntity.ok("토큰 테스트 완료");
    }

}
