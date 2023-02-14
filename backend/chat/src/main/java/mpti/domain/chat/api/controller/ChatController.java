package mpti.domain.chat.api.controller;

import lombok.RequiredArgsConstructor;
import mpti.domain.chat.api.request.ChatHandlerRequest;
import mpti.domain.chat.api.response.ChatHandlerResponse;
import mpti.domain.chat.api.response.GetChannelIdResponse;
import mpti.domain.chat.api.response.GetChatHistoryResponse;
import mpti.domain.chat.api.response.GetChatListResponse;
import mpti.domain.chat.application.ChatService;
import mpti.domain.chat.entity.Channel;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final ChatService chatService;

//    @MessageMapping("/chat/list")
//    public void SocketHandler2(RoomListRequest roomListRequest){
//
//        List<Channel> channelList = chatService.getChannelList(1L);
//
//        simpMessagingTemplate.convertAndSend("/send/roomList", channelList);
//    }


//    [Message] receive를 메시지를 받을 endpoint로 설정합니다.
    @MessageMapping("/api/chat/receive")
    public void chatHandler(ChatHandlerRequest chatHandlerRequest){

        ChatHandlerResponse chatHandlerResponse = chatService.saveMessage(chatHandlerRequest);

        simpMessagingTemplate.convertAndSend("/send" + "/" + chatHandlerResponse.getChannelId(), chatHandlerResponse);

    }

//    [GET] 현재 본인과 상대방의 아이디를 가지고 채널 아이디를 받아옴(기존에 채널이 없었다면 만들어서 반환)

    @GetMapping("/channel/{trainerId}/{userId}/{trainerName}/{userName}")
    public ResponseEntity<Optional<GetChannelIdResponse>> getChannelId(
            @PathVariable Long trainerId,
            @PathVariable Long userId,
            @PathVariable String trainerName,
            @PathVariable String userName){

        Channel channel = chatService.getChannel(trainerId, trainerName, userId, userName);

        String channelId = channel.getId();

        return ResponseEntity.ok(Optional.of(new GetChannelIdResponse(channelId)));
    }

//    [GET] 해당 채팅방의 메시지 리스트 반환

    @GetMapping("/load/{channelId}")
    public List<GetChatHistoryResponse> getChatHistory(@PathVariable String channelId){


        List<GetChatHistoryResponse> chatHistory = chatService.getChatHistory(channelId);

        return chatHistory;
    }

//    [GET] 현재 대화를 한 기록이 있는 모든 상대와의 마지막 메시지 반환 (카카오톡 채팅 목록과 같은 기능)

    @GetMapping("/load/list/{id}/{role}")
    public List<GetChatListResponse> getChatList(@PathVariable Long id,
                                                 @PathVariable String role){

        List<GetChatListResponse> chatList = chatService.getChatList(id, role);

        return chatList;
    }
}
