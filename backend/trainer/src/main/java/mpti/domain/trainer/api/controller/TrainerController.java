package mpti.domain.trainer.api.controller;

import lombok.RequiredArgsConstructor;
import mpti.common.security.UserPrincipal;
import mpti.domain.trainer.api.request.ApprovedRequest;
import mpti.domain.trainer.api.request.SignUpRequest;
import mpti.domain.trainer.api.request.UpdateRequest;
import mpti.domain.trainer.api.response.UserInfoResponse;
import mpti.domain.trainer.application.FileService;
import mpti.domain.trainer.application.TrainerService;
import mpti.domain.trainer.dto.FileDto;
import mpti.domain.trainer.dto.TrainerDto;
import org.springframework.context.annotation.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import mpti.domain.trainer.application.S3Service;
import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/trainer")
@RequiredArgsConstructor
public class TrainerController {

    private final S3Service s3Service;
    private final FileService fileService;
    private final TrainerService trainerService;

    @GetMapping("/test")
    public String checkDuplicateId() {
        return "<h1>Hello Trainer Server Main Page</h1>";
    }

    @GetMapping("/duplicate/{email}")
    public ResponseEntity checkDuplicateId(@PathVariable String email) {
        trainerService.checkDuplicateEmail(email);
        return ResponseEntity.ok("check success");
    }

    @PostMapping("/join")
    public ResponseEntity join(@Valid @RequestBody SignUpRequest signupRequest) {
        trainerService.join(signupRequest);
        return ResponseEntity.ok("join success");
    }

    @GetMapping("/info/{email}")
    public ResponseEntity getTrainerInfo(@PathVariable String email) {
        TrainerDto trainerDto = trainerService.getInfo(email);
        return ResponseEntity.ok(trainerDto);
    }

    @PostMapping("/info/update/{email}")
//    @PreAuthorize("hasAuthority('ROLE_TRAINER')")
    public ResponseEntity updateTrainerInfo(@PathVariable String email, @RequestBody UpdateRequest updateRequest) {
//        String email = userPrincipal.getEmail();
        TrainerDto trainerDto = trainerService.updateInfo(email, updateRequest);
        return ResponseEntity.ok(trainerDto);
    }

    @GetMapping("/info/delete/{email}")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity deleteTrainer(@PathVariable String email) {
        trainerService.deleteInfo(email);
        return ResponseEntity.ok("delete success");
    }

    @GetMapping("/list/{page}")
    public ResponseEntity getTrainerListByDate(@PathVariable int page) {
        Page<TrainerDto> pages = trainerService.getAllTrainers(page, 8, "createAt");
        return ResponseEntity.ok(pages);
    }

    @GetMapping("/listbystar/{page}")
    public ResponseEntity getTrainerListByStar(@PathVariable int page) {
        Page<TrainerDto> pages = trainerService.getAllTrainers(page, 8, "stars");
        return ResponseEntity.ok(pages);
    }

    @GetMapping("/application/list/{page}")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity getTrainerApplicationList(@PathVariable int page) {
        Page<TrainerDto> pages = trainerService.getAllNotApprovedTrainers(page, 4);
        return ResponseEntity.ok(pages);
    }

    @PostMapping("/application/process")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity processTrainerApplicationList(@Valid @RequestBody ApprovedRequest approvedRequest) {
        Boolean approved = approvedRequest.getApproved();
        System.out.println(approved);
        if (approved) {
            trainerService.setAprroved(approvedRequest.getEmail());
            return ResponseEntity.ok("approve success");
        } else {
            trainerService.deleteInfo(approvedRequest.getEmail());
            return ResponseEntity.ok("delete success");
        }
    }


    @PostMapping("/upload")
    public ResponseEntity uploadFile(FileDto fileDto) throws IOException {
        String url = s3Service.uploadFile(fileDto.getFile(), fileDto.getEmail());
        System.out.println(url);
        fileDto.setUrl(url);
        fileService.save(fileDto);

        Map<String, String> map = new HashMap<>();
        map.put("imageUrl", url);
        return ResponseEntity.ok(map);
    }

    @GetMapping("/search/name/{page}/{word}")
    public ResponseEntity searchByName(@PathVariable int page, @PathVariable String word) {
        Page<TrainerDto> pages = trainerService.searchTrainerByName(word, page, 8);
        return ResponseEntity.ok(pages);
    }
    @GetMapping("/search/date/{page}/{date}")
    public ResponseEntity searchByDate(@PathVariable int page, @PathVariable String date) {

        Page<TrainerDto> pages = trainerService.searchTrainerByDate(date, page, 8);
        return ResponseEntity.ok(pages);
    }




}
