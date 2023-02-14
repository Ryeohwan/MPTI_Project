package mpti.domain.chat.api.response;

import lombok.Getter;
import mpti.domain.chat.entity.Message;

import java.time.LocalDateTime;

@Getter
public class GetChatHistoryResponse {

    private String channelId;

    private String writer;

    private String content;

    private LocalDateTime createdDate;

    public GetChatHistoryResponse(Message message) {
        this.channelId = message.getChannelId();
        this.writer = message.getWriter();
        this.content = message.getContent();
        this.createdDate = message.getCreatedDate();
    }
}
