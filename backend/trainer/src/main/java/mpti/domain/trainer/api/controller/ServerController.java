package mpti.domain.trainer.api.controller;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import mpti.domain.trainer.api.request.StopRequest;
import mpti.domain.trainer.api.request.UpdateStarRequest;
import mpti.domain.trainer.api.response.ImageUrlResponse;
import mpti.domain.trainer.api.response.UserInfoResponse;
import mpti.domain.trainer.application.TrainerService;
import mpti.domain.trainer.dao.TrainerRepository;
import mpti.domain.trainer.dto.IdDto;
import mpti.domain.trainer.entity.Trainer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/trainer")
@RequiredArgsConstructor
public class ServerController {
    private final TrainerService trainerService;

    private final Gson gson;
//    @PostMapping("/admin/stop")
//    public ResponseEntity setStopUntil(@RequestBody StopRequest stopRequest) {
//        trainerService.setStopUntil(stopRequest);
//        return ResponseEntity.ok("stop trainer success");
//    }

    @PostMapping("/admin/stop")
    public ResponseEntity setStopUntil(@RequestBody String requestBody) {

        System.out.println("관리자 프로세스 시작");

        StopRequest stopRequest = gson.fromJson(requestBody, StopRequest.class);

        trainerService.setStopUntil(stopRequest);
        return ResponseEntity.ok("stop trainer success");
    }

    @GetMapping("/info/name/{id}")
    public ResponseEntity getTrainerName(@PathVariable Long id) {
        UserInfoResponse userInfoResponse = UserInfoResponse
                .builder()
                .name(trainerService.getName(id))
                .build();
        return ResponseEntity.ok(userInfoResponse);
    }

//    [POST] trainer/update/star
    @PostMapping("/update/star")
    public ResponseEntity updateStar(@RequestBody String requestBody) {
        UpdateStarRequest updateStarRequest = gson.fromJson(requestBody, UpdateStarRequest.class);
        trainerService.updateStar(updateStarRequest);
        return ResponseEntity.ok("update start success");
    }

    @PostMapping("/info/image")
    public ResponseEntity getTrainerUrl(@RequestBody String requestBody) {
        IdDto idDto = gson.fromJson(requestBody, IdDto.class);
        ImageUrlResponse imageUrlResponse = trainerService.getImageUrl(idDto);
        return ResponseEntity.ok(imageUrlResponse);
    }
}
