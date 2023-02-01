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
public class IndexController {
    @GetMapping("")
    public String checkDuplicateId() {
        return "<h1>Hello Trainer Server Main Page</h1>";
    }
}
