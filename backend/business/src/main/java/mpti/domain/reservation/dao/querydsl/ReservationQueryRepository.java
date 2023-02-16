package mpti.domain.reservation.dao.querydsl;

import com.querydsl.core.Tuple;
import mpti.domain.opinion.entity.Role;
import mpti.domain.reservation.dto.IdNameDto;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationQueryRepository {

    List<IdNameDto> findDistinctIdListByTrainerIdOrUserIdByRole(Long id, Role role);
}
