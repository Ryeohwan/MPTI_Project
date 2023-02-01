package mpti.domain.trainer.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    @Column(nullable = false)
    private String name;
    @Email
    @Column(nullable = false, unique = true)
    private String email;
    private String imageUrl;
    @Column(nullable = false)
    private Boolean emailVerified = false;
    private String password;
    private String provider;
    private String providerId;
    private String gender;
    private String phone;
    private String address2;
    private String license;
    private boolean approved;
    @CreatedDate
    @Column(name = "create_at")
    private LocalDateTime createAt;
    @LastModifiedDate
    @Column(name = "update_at")
    private LocalDateTime updateAt;

}
