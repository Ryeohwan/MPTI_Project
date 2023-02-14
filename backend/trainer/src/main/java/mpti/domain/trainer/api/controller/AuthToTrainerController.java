package mpti.domain.trainer.api.controller;


import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import mpti.common.errors.BadRequestException;
import mpti.common.errors.EmailDuplicateException;
import mpti.common.security.UserPrincipal;
import mpti.domain.trainer.api.request.LoginRequest;
import mpti.domain.trainer.api.request.SocialSignUpRequest;
import mpti.domain.trainer.dao.TrainerRepository;
import mpti.domain.trainer.entity.Trainer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;
import java.util.Optional;

/**
 * 인증서버와 통신을 위한  Controller
 */

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/trainer/api/auth")
public class AuthToTrainerController {
    private static final Logger logger = LoggerFactory.getLogger(AuthToTrainerController.class);
    private final TrainerRepository trainerRepository;
    private final PasswordEncoder passwordEncoder;
    private final Gson gson;

    /**
     * 일반 로그인 + 소셜 로그인
     * @param requestBody
     * @return
     */

    @PostMapping("/login")
    public Optional<Trainer> login(@RequestBody String requestBody) {

        LoginRequest loginRequest = gson.fromJson(requestBody, LoginRequest.class);
        if(!trainerRepository.existsByEmail(loginRequest.getEmail())){
            logger.error("이 아이디에 해당하는 트레이너를 찾을 수 없습니다");
        }
        return trainerRepository.findByEmail(loginRequest.getEmail());
    }

    /**
     * 소셜로그인을 통해 회원가입 할때
     * @param socialSignUpRequest
     * @return
     */

    @PostMapping("/signup")
    public ResponseEntity<Trainer> registerUser(@Valid @RequestBody SocialSignUpRequest socialSignUpRequest) {
        if(trainerRepository.existsByEmail(socialSignUpRequest.getEmail())) {
            throw new EmailDuplicateException("이미 사용하고 있는 아이디 이메일입니다");
        }

        Trainer user = Trainer.builder()
                .name(socialSignUpRequest.getName())
                .email(socialSignUpRequest.getEmail())
                .password(passwordEncoder.encode(socialSignUpRequest.getPassword()))
                .provider(socialSignUpRequest.getProvider())
                .build();

        Trainer result = trainerRepository.saveAndFlush(user);
        return ResponseEntity.ok(result);
    }

    /**
     * 이전에 소셜로그인으로 회원가입이 된 사용자 일때
     * 해당 유저의 정보를 가져온다
     * @param body - email
     * @return
     */

    @PostMapping("/update")
    public Optional<Trainer> updateUser(@Valid @RequestBody Map<String , Object> body) {
        String email = (String) body.get("email");

        Optional<Trainer> result = trainerRepository.findByEmail(email);
        if(result.isEmpty()){
            logger.error("이 아이디에 해당하는 트레이너를 찾을 수 없습니다");
        }
        return result;
    }

//    /**
//     * 권한 테스트
//     * @param userPrincipal
//     * @return
//     */
//    @GetMapping("/test")
//    @PreAuthorize("hasAuthority('ROLE_TRAINER')")
//    public ResponseEntity<?> test(@AuthenticationPrincipal UserPrincipal userPrincipal) {
//        System.out.println(userPrincipal.getEmail());
//        return ResponseEntity.ok("토큰 테스트 완료");
//    }
}
