package mpti.domain.business.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Reservation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="reservation_id")
    private Long id;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "trainer_id")
//    private Trainer trainer;
    @Column
    private Long trainerId;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id")
//    private User user;
    private Long userId;


//    @Column(name = "date_time")
//    private LocalDateTime dateTime;

    private int year, month, day, hour;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Reservation(Long trainerId, int year, int month, int day, int hour) {
        this.trainerId = trainerId;
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
    }

    public void reserve(Long userId){
        this.userId = userId;
    }

    public void cancel(){
        this.userId = null;
    }


}
