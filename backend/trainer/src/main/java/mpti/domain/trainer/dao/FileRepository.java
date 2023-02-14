package mpti.domain.trainer.dao;

import mpti.domain.trainer.entity.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<Trainer, Long> {
}