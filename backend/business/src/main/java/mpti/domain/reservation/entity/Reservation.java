package mpti.domain.reservation.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
public class Reservation {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="reservation_id")
    private Long id;

    @Column(nullable = false)
    private Long trainerId;
    @Column(nullable = false)
    private String trainerName;

    private String imageUrl;

    private Long userId;
    private String userName;


    @Column(nullable = false)
    private int year;
    @Column(nullable = false)
    private int month;
    @Column(nullable = false)
    private int day;
    @Column(nullable = false)
    private int hour;


    @Column(unique = true, nullable = false)
    private String sessionId;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Builder
    public Reservation(Long trainerId, String trainerName, int year, int month, int day, int hour) {
        this.trainerId = trainerId;
        this.trainerName = trainerName;
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
    }

    @PrePersist
    public void autofill() {
        this.setSessionId(UUID.randomUUID().toString());
    }

    public void reserve(Long userId, String userName){
        this.userId = userId;
        this.userName = userName;
    }

    public void cancel(){
        this.userId = null;
        this.userName = null;
    }


}
