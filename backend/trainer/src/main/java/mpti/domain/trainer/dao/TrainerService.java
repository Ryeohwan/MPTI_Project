package mpti.domain.trainer.dao;

import lombok.RequiredArgsConstructor;
import mpti.common.exception.EmailDuplicateException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TrainerService {

    private final TrainerRepository trainerRepository;
    @Transactional(readOnly = true)
    public void checkDuplicateEmail(String email) {
        if(trainerRepository.existsByEmail(email)) {
            throw new EmailDuplicateException(email);
        }
    }
}
