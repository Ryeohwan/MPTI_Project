package mpti.domain.business.dao;

import lombok.RequiredArgsConstructor;
import mpti.domain.business.entity.Report;
import mpti.domain.business.entity.Review;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class OpinionRepository111 {

    private final EntityManager em;
    
    public void saveReport(Report report) {
        em.persist(report);
    }

    public List<Report> findAllReports() {
        return em.createQuery("select r from Report r", Report.class)
                .getResultList();
    }

    public Report findOneReport(Long reportId) {
        return em.find(Report.class, reportId);
    }

}
