package mpti.domain.trainer.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.Value;
import mpti.domain.trainer.api.request.SignupRequest;
import mpti.domain.trainer.dao.TrainerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.UnknownHostException;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class IndexController {

    private final TrainerService trainerService;

    @GetMapping("")
    public ResponseEntity checkDuplicateId(@RequestBody(required = true) String email) {

        return ResponseEntity.ok(email);
    }


}
