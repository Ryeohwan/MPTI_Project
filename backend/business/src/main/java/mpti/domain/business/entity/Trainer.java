//package mpti.domain.business.entity;
//
//import lombok.Getter;
//import lombok.Setter;
//import org.springframework.data.annotation.CreatedDate;
//import org.springframework.data.annotation.LastModifiedDate;
//
//import javax.persistence.*;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//
//@Entity
//@Getter
//@Setter
//public class Trainer {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "trainer_id")
//    private Long id;
//    @OneToMany(mappedBy = "trainer")
//    private List<Reservation> reservations = new ArrayList<>();
//
//    @OneToMany(mappedBy = "trainer")
//    private List<Review> reviews = new ArrayList<>();
//
//    @OneToMany(mappedBy = "trainer")
//    private List<Report> reports = new ArrayList<>();
//
//    @Column(unique = true)
//    private String email;
//    private String password;
//    private int age;
//    private String gender;
//    private String phone;
//    private String address;
//    @Enumerated(EnumType.STRING)
//    private Role role;
//    private boolean approved;
//
//    private String license;
//
//    @CreatedDate
//    @Column(name = "create_at")
//    private LocalDateTime createAt;
//
//    @LastModifiedDate
//    @Column(name = "update_at")
//    private LocalDateTime updateAt;
//}
