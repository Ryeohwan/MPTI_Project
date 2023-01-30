package mpti.domain.opinion.entity;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

@Entity
@DiscriminatorValue("review")
@Getter
@Setter
public class Review extends Opinion{

    private Double star;
}