package mpti.domain.chat.dao;

import mpti.domain.chat.entity.Channel;
import mpti.domain.chat.entity.Message;
//import mpti.domain.chat.entity.Mmessage;
//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

//public interface MessageRepository extends JpaRepository<Message, Long> {
//    List<Message> findByChannelId(Long ChannelId);
//
//
//    Message findTop1ByChannelIdOrderByCreatedDateDesc(Long channelId);
//
//}


public interface MessageRepository extends MongoRepository<Message, String> {

    List<Message> findByChannelId(String ChannelId);

    Message findTop1ByChannelIdOrderByCreatedDateDesc(String channelId);

    List<Message> findAllByChannelId(String channelId);
}
