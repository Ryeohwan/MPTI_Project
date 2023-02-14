package mpti.domain.chat.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
//import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Getter
@Document(collection = "message")
public class Message {

    @Id
    private String id;

    private String channelId;

    private String writer;
    private String content;

    private LocalDateTime createdDate;

    public Message(String channelId, String writer, String content) {
        this.channelId = channelId;
        this.writer = writer;
        this.content = content;
        this.createdDate = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
    }
}