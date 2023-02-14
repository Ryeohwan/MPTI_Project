package mpti.domain.trainer.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "trainer")
public class Trainer {

//    @Id
//    @GeneratedValue(generator = "uuid2")
//    @GenericGenerator(name = "uuid2", strategy = "uuid2")
//    @Column(name = "trainer_id", columnDefinition = "BINARY(16)")
//    private UUID id;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trainer_id")
    private Long id;
    @Column(nullable = false)
    private String name;
    @Email
    @Column(nullable = false, unique = true)
    private String email;
    private String imageUrl;
    private String password;
    @Column(columnDefinition = "varchar(10) default 'local'")
    private String provider;
    private String gender;
    private String phone;
    private String awards;
    private String license;
    private String career;
    private boolean approved;
    private String title;
    @Column(columnDefinition = "double default 0")
    private double stars;
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private LocalDate stopUntil;
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private LocalDate birthday;
    @CreatedDate
    @Column(name = "create_at")
    private LocalDateTime createAt;
    @LastModifiedDate
    @Column(name = "update_at")
    private LocalDateTime updateAt;
    public void setTitle(String title) {
        if(title != null) this.title = title;
    }


    @Builder
    public Trainer(Long id, String name, String email, String imageUrl, String password, String provider, String gender, String phone, String awards, String license, String career, LocalDate birthday, LocalDate stopUntil) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.imageUrl = imageUrl;
        this.password = password;
        this.provider = provider;
        this.gender = gender;
        this.phone = phone;
        this.awards = awards;
        this.license = license;
        this.career = career;
        this.birthday = birthday;
        this.stopUntil = stopUntil;
    }
}
