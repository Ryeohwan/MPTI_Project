package mpti.domain.trainer.application;

import lombok.RequiredArgsConstructor;

import mpti.domain.trainer.dao.TrainerRepository;
import mpti.domain.trainer.dto.FileDto;
import mpti.domain.trainer.entity.Trainer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FileService {
    private final TrainerRepository trainerRepository;

    public void save(FileDto fileDto) {
        Trainer result = trainerRepository.findTrainerByEmail(fileDto.getEmail());
        result.setImageUrl(fileDto.getUrl());
    }

}