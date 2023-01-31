package mpti.common.security;


import mpti.domain.member.dao.UserRepository;
import mpti.domain.member.entity.User;
import mpti.domain.member.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        if(!userRepository.existsByEmail(email)) {
            throw new UsernameNotFoundException("사용자의 이메일을 찾을 수 없습니다 " + email);
        }
        User user = userRepository.findUserByEmail(email);

        return UserPrincipal.create(user);
    }

//    @Transactional
//    public UserDetails loadUserById(Long id) {
//        User user = userRepository.findById(id).orElseThrow(
//            () -> new ResourceNotFoundException("User", "id", id)
//        );
//
//        return UserPrincipal.create(user);
//    }
}