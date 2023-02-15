package mpti.domain.chat.api.response;

import lombok.Getter;

@Getter
public class GetChannelIdResponse {

    private String id;

    public GetChannelIdResponse(String id) {
        this.id = id;
    }
}
