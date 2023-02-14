package mpti.domain.trainer.dao;

import mpti.domain.trainer.entity.Trainer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {

    Optional<Trainer> findByEmail(String email);
    Boolean existsByEmail(String email);
    Trainer findTrainerByEmail(String email);
    Slice<Trainer> findSliceByApproved(Boolean approved, PageRequest pageRequest);
    Page<Trainer> findPageByApproved(Boolean approved, PageRequest pageRequest);

}
