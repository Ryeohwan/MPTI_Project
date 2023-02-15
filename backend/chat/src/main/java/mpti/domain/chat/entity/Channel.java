package mpti.domain.chat.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

//@Entity
//@Getter
//@NoArgsConstructor
//public class Channel {
//
//    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "channel_id")
//    private Long id;
//
//    private Long trainerId;
//    private Long userId;
//
////    @OneToMany(mappedBy = "channel")
////    private List<Message> messages = new ArrayList<>();
//
//    public Channel(Long trainerId, Long userId) {
//        this.trainerId = trainerId;
//        this.userId = userId;
//    }
//}

@Data
@Document(collection = "channel")
public class Channel {

    @Id
    private String id;

    private Long trainerId;
    private String trainerName;

    private Long userId;
    private String userName;


    public Channel(Long trainerId, String trainerName, Long userId, String userName) {
        this.trainerId = trainerId;
        this.trainerName = trainerName;
        this.userId = userId;
        this.userName = userName;
    }
}
