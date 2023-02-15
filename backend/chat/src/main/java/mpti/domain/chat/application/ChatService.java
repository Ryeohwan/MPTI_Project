package mpti.domain.chat.application;

import lombok.RequiredArgsConstructor;
import mpti.domain.chat.api.request.ChatHandlerRequest;
import mpti.domain.chat.api.response.ChatHandlerResponse;
import mpti.domain.chat.api.response.GetChatHistoryResponse;
import mpti.domain.chat.api.response.GetChatListResponse;
//import mpti.domain.chat.dao.ChannelMongoRepository;
import mpti.domain.chat.dao.ChannelRepository;
//import mpti.domain.chat.dao.MessageMongoRepository;
import mpti.domain.chat.dao.MessageRepository;
//import mpti.domain.chat.dto.MessageDto;
import mpti.domain.chat.entity.Channel;
import mpti.domain.chat.entity.Message;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {

    private final MessageRepository messageRepository;
    private final ChannelRepository channelRepository;


    public ChatHandlerResponse saveMessage(ChatHandlerRequest chatHandlerRequest) {
//        Optional<Channel> channel = channelRepository.findById(msgDto.getChannelId());

        Message message = new Message(chatHandlerRequest.getChannelId(), chatHandlerRequest.getWriter(), chatHandlerRequest.getContent());

        Message savedMessage = messageRepository.save(message);

        ChatHandlerResponse chatHandlerResponse = new ChatHandlerResponse(savedMessage);

        return chatHandlerResponse;
    }

    public Channel getChannel(Long trainerId, String trainerName, Long userId, String userName) {
        Optional<Channel> channel = channelRepository.findChannelByTrainerIdAndUserId(trainerId, userId);

        if (channel.isEmpty()) {
            Channel newChannel = new Channel(trainerId, trainerName, userId, userName);
            Channel savedChannel = channelRepository.save(newChannel);
            return savedChannel;
        } else {
            return channel.get();
        }
    }

    public List<GetChatHistoryResponse> getChatHistory(String  channelId) {
        List<Message> chatList = messageRepository.findAllByChannelId(channelId);

        List<GetChatHistoryResponse> getChatHistoryResponseList = chatList.stream()
                .map((chat) -> new GetChatHistoryResponse(chat))
                .collect(Collectors.toList());

        return getChatHistoryResponseList;
    }


    public List<GetChatListResponse> getChatList(Long id, String role) {

        List<Channel> channels;
        List<GetChatListResponse> chatList = new ArrayList<>();


        if (role.equals("TRAINER")) {
            channels = channelRepository.findByTrainerId(id);
        } else {
            channels = channelRepository.findByUserId(id);
        }

        for (Channel channel : channels) {
            Message message = messageRepository.findTop1ByChannelIdOrderByCreatedDateDesc(channel.getId());
            if(message == null){
                continue;
            }
            GetChatListResponse getChatListResponse;
            if (role.equals("TRAINER")) {
                getChatListResponse = new GetChatListResponse(channel.getId(), channel.getUserId(), channel.getUserName(), message.getContent(), message.getCreatedDate());
            }else{
                getChatListResponse = new GetChatListResponse(channel.getId(), channel.getTrainerId(), channel.getTrainerName(), message.getContent(), message.getCreatedDate());
            }
            chatList.add(getChatListResponse);
        }

        return chatList;
    }
}