package mpti.domain.trainer.api.controller;

import lombok.RequiredArgsConstructor;
import mpti.common.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/trainer/token")
public class TokenTestController {

    /**
     * 권한 테스트
     * @param userPrincipal
     * @return
     */
    @GetMapping("/trainer")
    @PreAuthorize("hasAuthority('ROLE_TRAINER')")
    public ResponseEntity<?> tesstTrainer(@AuthenticationPrincipal UserPrincipal userPrincipal) {
            System.out.println(userPrincipal.getEmail());

            Map<String, String> response = new HashMap<>();
            response.put("id", userPrincipal.getId() + "");
            response.put("name", userPrincipal.getUsername());
            response.put("password", userPrincipal.getPassword());

            return ResponseEntity.ok(response);
    }

    @GetMapping("/user")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<?> testUser(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        System.out.println(userPrincipal.getEmail());
        return ResponseEntity.ok("유저 토큰 테스트 완료");
    }
}
