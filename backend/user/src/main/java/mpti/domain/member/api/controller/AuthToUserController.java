package mpti.domain.member.api.controller;


import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import mpti.domain.member.api.request.LoginRequest;
import mpti.domain.member.api.request.SignUpRequest;
import mpti.domain.member.dao.UserRepository;
import mpti.domain.member.entity.User;
import mpti.domain.member.exceptions.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthToUserController {
    private static final Logger logger = LoggerFactory.getLogger(AuthToUserController.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Gson gson;

    /**
     * 일반 로그인 시
     * 서버와 서버간 통신
     * Auth - Trainer
     * @param requestBody
     * @return
     */

    @PostMapping("/login")
    public Optional<User> login(@RequestBody String requestBody) {

        LoginRequest loginRequest = gson.fromJson(requestBody, LoginRequest.class);
        System.out.println(requestBody);
        System.out.println(loginRequest);

        User user = userRepository.findUserByEmail(loginRequest.getEmail());

        if(user == null){
            logger.error("이 아이디에 해당하는 트레이너를 찾을 수 없습니다");
            return Optional.of(null);
        } else {
            logger.info(user.getEmail());
        }
        return Optional.of(user);
    }

    /**
     * 일반 회원가입 ( 폼 )
     * @param signUpRequest
     * @return
     */

    @PostMapping("/signup")
    public ResponseEntity<User> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("이미 사용하고 있는 아이디 이메일입니다");
        }

        // Creating user's account
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setProvider(signUpRequest.getProvider());

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User result = userRepository.saveAndFlush(user);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/update")
    public ResponseEntity<User> updateUser(@Valid @RequestBody Map<String , Object> body) {
        String email = (String) body.get("email");
        logger.info("update controller");
        logger.info(email);

        User result = userRepository.findUserByEmail(email);
        if(result == null){
            logger.error("이 아이디에 해당하는 트레이너를 찾을 수 없습니다");
            return ResponseEntity.ok(null);
        }

        logger.info(result.getEmail());
        return ResponseEntity.ok(result);
    }





}
