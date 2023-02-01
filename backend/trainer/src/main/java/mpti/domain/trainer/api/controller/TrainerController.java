package mpti.domain.trainer.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.Value;
import mpti.domain.trainer.api.request.SignupRequest;
import mpti.domain.trainer.dao.TrainerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.UnknownHostException;

@RestController
@RequestMapping("/api/trainer")
@RequiredArgsConstructor
public class TrainerController {

    private final TrainerService trainerService;

    @GetMapping("/duplication-check")
    public ResponseEntity checkDuplicateId(@RequestBody(required = true) String email) {
        trainerService.checkDuplicateEmail(email);
        return ResponseEntity.ok(email);
    }

    @PostMapping("/join")
    public ResponseEntity join(@Valid @RequestBody SignupRequest signupRequest) {

        return ResponseEntity.ok("");
    }

    @GetMapping("/info")
    public ResponseEntity getTrainerInfo(@Valid @RequestBody SignupRequest signupRequest) {
        return ResponseEntity.ok("");
    }

    @PostMapping("/info/update")
    public ResponseEntity updateTrainerInfo(@Valid @RequestBody SignupRequest signupRequest) {
        return ResponseEntity.ok("");
    }

    @GetMapping("/info/delete")
    public ResponseEntity deleteTrainer(@Valid @RequestBody SignupRequest signupRequest) {
        return ResponseEntity.ok("");
    }

    @GetMapping("/list")
    public ResponseEntity getTrainerList(@Valid @RequestBody SignupRequest signupRequest) {
        return ResponseEntity.ok("");
    }

    @GetMapping("/application/list")
    public ResponseEntity getTrainerApplicationList(@Valid @RequestBody SignupRequest signupRequest) {
        return ResponseEntity.ok("");
    }

    @PostMapping("/application/process")
    public ResponseEntity processTrainerApplicationList(@Valid @RequestBody SignupRequest signupRequest) {
        return ResponseEntity.ok("");
    }






}
