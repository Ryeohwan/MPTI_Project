package mpti.domain.trainer.application;

import lombok.RequiredArgsConstructor;
import mpti.common.errors.EmailDuplicateException;
import mpti.common.errors.ResourceNotFoundException;
import mpti.domain.trainer.api.request.SignUpRequest;
import mpti.domain.trainer.api.request.StopRequest;
import mpti.domain.trainer.api.request.UpdateRequest;
import mpti.domain.trainer.dao.TrainerRepository;
import mpti.domain.trainer.dto.TrainerDto;
import mpti.domain.trainer.entity.Trainer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class TrainerService {
    private final PasswordEncoder passwordEncoder;

    private final TrainerRepository trainerRepository;
    @Transactional(readOnly = true)
    public void checkDuplicateEmail(String email) {
        if(trainerRepository.findByEmail(email).orElse(null) != null) {
            throw new EmailDuplicateException(email);
        }
    }

    @Transactional
    public void join(final SignUpRequest signUpRequest) {
        if(trainerRepository.findByEmail(signUpRequest.getEmail()).orElse(null) != null) {
            throw new EmailDuplicateException(signUpRequest.getEmail());
        }

        Trainer trainer = Trainer.builder()
                .name(signUpRequest.getName())
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .birthday(signUpRequest.getBirthday())
                .gender(signUpRequest.getGender())
                .phone(signUpRequest.getPhone())
                .awards(signUpRequest.getAwards())
                .license(signUpRequest.getLicense())
                .career(signUpRequest.getCareer())
                .stopUntil(LocalDate.now().minusDays(1))
                .provider("local")
                .build();
        trainerRepository.save(trainer);
    }

    @Transactional(readOnly = true)
    public TrainerDto getInfo(String email) {
        Trainer trainer = trainerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Email", email)
                );

        TrainerDto trainerDto = TrainerDto.builder()
                .id(trainer.getId())
                .name(trainer.getName())
                .email(trainer.getEmail())
                .birthday(trainer.getBirthday())
                .gender(trainer.getGender())
                .phone(trainer.getPhone())
                .awards(trainer.getAwards())
                .license(trainer.getLicense())
                .career(trainer.getCareer())
                .imageUrl(trainer.getImageUrl())
                .build();
        return trainerDto;
    }

    @Transactional
    public TrainerDto updateInfo(String email, UpdateRequest updateRequest) {
        Trainer trainer = trainerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Email", email)
                );

        String name = updateRequest.getName();
        String phone = updateRequest.getPhone();
        String gender = updateRequest.getGender();
        String imageUrl = updateRequest.getImageUrl();

        if(name != null) trainer.setName(name);
        if(phone != null) trainer.setPhone(phone);
        if(gender != null) trainer.setGender(gender);
        if(imageUrl != null) trainer.setImageUrl(imageUrl);

        return getInfo(email);
    }

    @Transactional
    public void deleteInfo(String email) {
        Trainer trainer = trainerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Email", email)
                );

        trainerRepository.delete(trainer);
    }

    @Transactional(readOnly = true)
    public String getName(Long id) {
        Trainer trainer = trainerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Id", id)
                );
        return trainer.getName();
    }

    @Transactional
    public void setAprroved(String email) {
        Trainer trainer = trainerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Email", email)
                );
        trainer.setApproved(true);
    }

    public Page<TrainerDto> getAllTrainers(int page, int size, String orderType) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, orderType));
        Page<Trainer> pages = trainerRepository.findPageByApproved(true, pageRequest);
        Page<TrainerDto> toMap = pages.map(m
                -> TrainerDto.builder()
                .name(m.getName())
                .email(m.getEmail())
                .birthday(m.getBirthday())
                .gender(m.getGender())
                .phone(m.getPhone())
                .awards(m.getAwards())
                .license(m.getLicense())
                .career(m.getCareer())
                .imageUrl(m.getImageUrl())
                .stars(m.getStars())
                .createAt(m.getCreateAt())
                .build()
        );

        return toMap;
    }

    public Page<TrainerDto> getAllNotApprovedTrainers(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "createAt"));
        Page<Trainer> pages = trainerRepository.findPageByApproved(false, pageRequest);
        Page<TrainerDto> toMap = pages.map(m
                -> TrainerDto.builder()
                .name(m.getName())
                .email(m.getEmail())
                .birthday(m.getBirthday())
                .gender(m.getGender())
                .phone(m.getPhone())
                .awards(m.getAwards())
                .license(m.getLicense())
                .career(m.getCareer())
                .imageUrl(m.getImageUrl())
                .stars(m.getStars())
                .createAt(m.getCreateAt())
                .build()
        );
        return toMap;
    }

    @Transactional
    public void setStopUntil(StopRequest stopRequest) {
        Long userId = stopRequest.getId();
        Trainer trainer = trainerRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Trainer Id", userId)
                );
        trainer.setStopUntil(stopRequest.getStopUntil());
    }
}
