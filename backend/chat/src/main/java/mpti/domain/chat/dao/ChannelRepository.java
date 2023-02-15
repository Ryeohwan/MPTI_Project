package mpti.domain.chat.dao;

import mpti.domain.chat.entity.Channel;
//import mpti.domain.chat.entity.Mchannel;
//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

//public interface ChannelRepository extends JpaRepository<Channel, Long> {
//
//    Optional<Channel> findChannelByTrainerIdAndUserId(Long trainerId, Long userId);
//
//
//    List<Channel> findByTrainerId(Long trainerId);
//
//    List<Channel> findByUserId(Long userId);
//
//    List<Channel> findAllByUserId(Long id);
//
//    List<Channel> findAllByTrainerId(Long id);
//}


public interface ChannelRepository extends MongoRepository<Channel, String> {

    Optional<Channel> findChannelByTrainerIdAndUserId(Long trainerId, Long userId);


    List<Channel> findByTrainerId(Long trainerId);

    List<Channel> findByUserId(Long userId);

    List<Channel> findAllByUserId(Long id);

    List<Channel> findAllByTrainerId(Long id);
}
