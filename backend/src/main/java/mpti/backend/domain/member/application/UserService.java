package mpti.domain.member.application;


import lombok.RequiredArgsConstructor;
import mpti.domain.member.dao.UserRepository;
import mpti.domain.member.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;


@RequiredArgsConstructor
@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public boolean isEmailDuplicate(String email) {
        if (userRepository.existsByEmail(email)) {
            return true;
        }
        return false;
    }

    public String join(User user) {
        userRepository.save(user);
        return user.getName();
    }

    @Transactional(readOnly = true)
    public User findByEmail(String email){
        User result = userRepository.findUserByEmail(email);
        result.setPassword("");
        return result;
    }

    @Transactional(readOnly = true)
    public Boolean relog(String email, String name) {
        if(userRepository.findUserByEmailAndPassword(email,name).getEmail() == null){
            return false;
        }else{
            return true;
        }
    }

    public int delete(String email, String name){
        return userRepository.deleteUserByEmailAndPassword(email,name);
    }

    public User update(User user){
        String email = user.getEmail();
        User check = userRepository.findUserByEmail(email);
        check.setPhone(user.getPhone());
        check.setAddress(user.getAddress());
        check.setAge(user.getAge());
        check.setUpdateAt(LocalDateTime.now());
        check.setPassword(user.getPassword());
        check.setGender(user.getGender());
        return check;
    }


}
