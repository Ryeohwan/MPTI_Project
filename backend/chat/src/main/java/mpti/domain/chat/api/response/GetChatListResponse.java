package mpti.domain.chat.api.response;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class GetChatListResponse {

    private String channelId;

    private Long yourId;

    private String yourName;

    private String content;

    private LocalDateTime createdDate;

//    private Long unRead;


    public GetChatListResponse(String channelId, Long yourId, String yourName, String content, LocalDateTime createdDate) {
        this.channelId = channelId;
        this.yourId = yourId;
        this.yourName = yourName;
        this.content = content;
        this.createdDate = createdDate;
    }
}