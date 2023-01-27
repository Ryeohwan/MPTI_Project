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
//@Table
//@Getter
//@Setter
//public class User {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "user_id")
//    private Long id;
//
////    @OneToMany(mappedBy = "user")
////    private List<Reservation> reservations = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user")
//    private List<Review> reviews = new ArrayList<>();
//    @OneToMany(mappedBy = "user")
//    private List<Ptlog> ptlogs = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user")
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
//    private int ticket;
//
//    @CreatedDate
//    @Column(name = "create_at")
//    private LocalDateTime createAt;
//
//    @LastModifiedDate
//    @Column(name = "update_at")
//    private LocalDateTime updateAt;
//
//}
