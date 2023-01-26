package mpti.domain.business.dao;

import mpti.domain.business.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByUserId(Long userId);

    Optional<Review> findById(Long reviewId);
}
