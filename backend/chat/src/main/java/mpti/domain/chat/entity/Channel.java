package mpti.domain.chat.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


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
