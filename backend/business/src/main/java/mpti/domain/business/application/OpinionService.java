package mpti.domain.business.application;

import lombok.RequiredArgsConstructor;
import mpti.domain.business.dao.OpinionRepository111;
import mpti.domain.business.dao.ReviewRepository;
import mpti.domain.business.entity.Report;
import mpti.domain.business.entity.Review;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class OpinionService {

    private final OpinionRepository111 opinionRepository111;

    private final ReviewRepository reviewRepository;


    public List<Review> loadReviews() {
        return reviewRepository.findAll();
    }

    public List<Review> loadReviewsByUserId(Long userId) {
        return reviewRepository.findByUserId(userId);
    }

    public void writeReview(Long userId, Long trainerId, Double star, String memo) {
        Review review = new Review();
        review.setUserId(userId);
        review.setTrainerId(trainerId);
        review.setStar(star);
        review.setMemo(memo);

        reviewRepository.save(review);
    }

    public Optional<Review> loadReviewDetail(Long id) {
        return reviewRepository.findById(id);
    }

    public void writeReport(Long userId, Long trainerId, String memo) {
        Report report = new Report();
        report.setUserId(userId);
        report.setTrainerId(trainerId);
        report.setMemo(memo);

        opinionRepository111.saveReport(report);
    }

    public List<Report> loadReports() {
        return opinionRepository111.findAllReports();
    }

    public Report loadReport(Long reportId) {
        return opinionRepository111.findOneReport(reportId);
    }

    public LocalDateTime processReport(Long reportId, int blockPeriod) {
        Report report = this.loadReport(reportId);
        LocalDateTime stopUntil = report.setStopUntil(blockPeriod);
        return stopUntil;
    }
}
