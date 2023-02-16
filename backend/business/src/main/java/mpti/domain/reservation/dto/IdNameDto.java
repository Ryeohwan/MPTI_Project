package mpti.domain.reservation.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;
import lombok.Getter;

@Data
public class IdNameDto {

    private Long id;

    private String name;

    @QueryProjection
    public IdNameDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
