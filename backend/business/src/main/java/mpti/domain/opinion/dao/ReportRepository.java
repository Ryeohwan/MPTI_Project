package mpti.domain.opinion.dao;

import mpti.domain.opinion.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
}
