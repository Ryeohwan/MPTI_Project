package mpti.domain.opinion.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "dtype")
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public abstract class Opinion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="opinion_id")
    private Long id;

    private Long writerId;
    private Long targetId;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    private String memo;

}
