package mpti.domain.business.entity;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("review")
@Getter
@Setter
public class Review extends Opinion{

    private Double star;
}