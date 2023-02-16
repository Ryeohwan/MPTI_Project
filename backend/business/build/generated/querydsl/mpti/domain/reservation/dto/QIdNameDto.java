package mpti.domain.reservation.dto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * mpti.domain.reservation.dto.QIdNameDto is a Querydsl Projection type for IdNameDto
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QIdNameDto extends ConstructorExpression<IdNameDto> {

    private static final long serialVersionUID = 1548020948L;

    public QIdNameDto(com.querydsl.core.types.Expression<Long> id, com.querydsl.core.types.Expression<String> name) {
        super(IdNameDto.class, new Class<?>[]{long.class, String.class}, id, name);
    }

}

