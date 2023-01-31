package mpti.common.security;

import lombok.RequiredArgsConstructor;
import mpti.domain.trainer.dao.TrainerRepository;
import mpti.domain.trainer.entity.Trainer;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final TrainerRepository trainerRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Trainer user = trainerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("이 이메일을 사용하는 회원이 없습니다 : " + email)
                );
        return UserPrincipal.create(user);
    }

}