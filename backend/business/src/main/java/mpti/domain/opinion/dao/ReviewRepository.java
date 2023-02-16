package mpti.domain.opinion.dao;

import mpti.domain.opinion.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByWriterId(Long writerId, PageRequest pageRequest);

    Optional<Review> findById(Long id);

    Page<Review> findAllByTargetId(Long trainerId, PageRequest pageRequest);

    @Query(value = "select ROUND(AVG(o.star)) from opinion o where o.target_id = ?1", nativeQuery = true)
    int findAverageStarByTrainerId(Long targetId);

    Page<Review> findAllByOrderByStarDesc(PageRequest pageRequest);

}
