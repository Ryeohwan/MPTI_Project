package mpti.domain.member.application;


import lombok.RequiredArgsConstructor;
import mpti.domain.member.dao.UserRepository;
import mpti.domain.member.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;


@RequiredArgsConstructor
@Service
@Transactional
public class UserService {
    EntityManager em;
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
        String password = user.getPassword();
        User check = userRepository.findUserByEmailAndPassword(email,password);
        check.setPhone(user.getPhone());
        check.setAddress(user.getAddress());
        check.setAge(user.getAge());
        check.setUpdateAt(LocalDateTime.now());
        check.setPassword(user.getPassword());
        check.setGender(user.getGender());
        check.setName(user.getName());
        return check;
    }


}
