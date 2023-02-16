package mpti.domain.reservation.dao.impl;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringPath;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import mpti.domain.opinion.entity.Role;
import mpti.domain.reservation.dao.querydsl.ReservationQueryRepository;
import mpti.domain.reservation.dto.IdNameDto;
import mpti.domain.reservation.dto.QIdNameDto;
import mpti.domain.reservation.entity.QReservation;
import org.springframework.stereotype.Repository;

import java.util.List;

@RequiredArgsConstructor
@Repository
public class ReservationQueryRepositoryImpl implements ReservationQueryRepository {

    private final JPAQueryFactory queryFactory;

    QReservation reservation = QReservation.reservation;

    public List<IdNameDto> findDistinctIdListByTrainerIdOrUserIdByRole(Long id, Role role) {

        JPAQuery<IdNameDto> query = queryFactory.select(new QIdNameDto(IsTrainerIdOrUserId(role), IsTrainerNameOrUserName(role))                 )
                .distinct()
                .from(reservation)
                .where(IsTrainerOrUser(id, role));
        return query.fetch();
    }


    private BooleanExpression IsTrainerOrUser(Long id, Role role) {
        if (role.equals(Role.USER)) {
            return reservation.userId.eq(id);
        }else{
            return reservation.trainerId.eq(id);
        }
    }

    private NumberPath<Long> IsTrainerIdOrUserId(Role role) {
        if (role.equals(Role.USER)) {
            return reservation.trainerId;
        }else{
            return reservation.userId;
        }
    }

    private StringPath IsTrainerNameOrUserName(Role role) {
        if (role.equals(Role.USER)) {
            return reservation.trainerName;
        }else{
            return reservation.userName;
        }
    }


}
