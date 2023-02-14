package mpti.domain.opinion.entity;

import lombok.AllArgsConstructor;
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

    @Column(nullable = false)
    private Long writerId;
    @Column(nullable = false)
    private String writerName;

    @Column(nullable = false)
    private Long targetId;
    @Column(nullable = false)
    private String targetName;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    private String memo;

    public Opinion() {

    }

    public Opinion(Long writerId, Long targetId, String writerName, String targetName, String memo) {
        this.writerId = writerId;
        this.targetId = targetId;
        this.writerName = writerName;
        this.targetName = targetName;
        this.memo = memo;
    }
}
