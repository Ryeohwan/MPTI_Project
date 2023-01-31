package mpti.domain.trainer.api.controller;


import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import mpti.common.exception.BadRequestException;
import mpti.domain.trainer.api.request.LoginRequest;
import mpti.domain.trainer.api.request.SignUpRequest;
import mpti.domain.trainer.dao.TrainerRepository;
import mpti.domain.trainer.entity.Trainer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthToTrainerController {
    private static final Logger logger = LoggerFactory.getLogger(AuthToTrainerController.class);
    private final TrainerRepository trainerRepository;
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
    public Optional<Trainer> login(@RequestBody String requestBody) {

        LoginRequest loginRequest = gson.fromJson(requestBody, LoginRequest.class);
        System.out.println(requestBody);
        System.out.println(loginRequest);

        Optional<Trainer> trainer = trainerRepository.findByEmail(loginRequest.getEmail());
        logger.info(loginRequest.getEmail());
        logger.info(trainer.toString());

        if(trainer.isEmpty()){
            logger.error("이 아이디에 해당하는 트레이너를 찾을 수 없습니다");
        } else {
            logger.info(trainer.get().getPassword());
        }
        return trainerRepository.findByEmail(loginRequest.getEmail());
    }

    /**
     * 일반 회원가입 ( 폼 )
     * @param signUpRequest
     * @return
     */

    @PostMapping("/signup")
    public ResponseEntity<Trainer> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if(trainerRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("이미 사용하고 있는 아이디 이메일입니다");
        }

        // Creating user's account
        Trainer user = new Trainer();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setProvider(signUpRequest.getProvider());

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Trainer result = trainerRepository.saveAndFlush(user);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/update")
    public ResponseEntity<Trainer> updateUser(@Valid @RequestBody Map<String , Object> body) {
        String email = (String) body.get("email");
        logger.info("update controller");
        logger.info(email);

        // Creating user's account
//        Trainer user = new Trainer();
//        user.setName(signUpRequest.getName());
//        user.setEmail(signUpRequest.getEmail());
//        user.setPassword(signUpRequest.getPassword());
//        user.setProvider(AuthProvider.local);
//
//        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Optional<Trainer> result = trainerRepository.findByEmail(email);
        if(result.isEmpty()){
            logger.error("이 아이디에 해당하는 트레이너를 찾을 수 없습니다");
            return ResponseEntity.ok(null);
        }

        logger.info(result.get().getEmail());
        return ResponseEntity.ok(result.get());
    }





}
