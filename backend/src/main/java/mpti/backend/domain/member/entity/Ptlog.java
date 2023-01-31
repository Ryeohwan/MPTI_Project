package mpti.domain.member.entity;

import javax.persistence.*;

@Entity
// fk 있는 주인
public class Ptlog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="ptlog_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String memo; // 일단 날짜랑 트레이너

    @Column(columnDefinition = "integer default 0")
    private int core,chest, shoulder, biceps, triceps,back,legs,aerobic;
}
