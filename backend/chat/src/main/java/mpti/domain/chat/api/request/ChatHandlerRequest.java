package mpti.domain.chat.api.request;

import lombok.Getter;

@Getter
public class ChatHandlerRequest {

    private String channelId;
    // 유저의 이름을 저장하기 위한 변수

    private String writer;

    // 메시지의 내용을 저장하기 위한 변
    private String content;
}
