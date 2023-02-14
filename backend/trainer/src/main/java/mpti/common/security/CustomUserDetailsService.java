package mpti.common.security;

import lombok.RequiredArgsConstructor;
import mpti.common.errors.ResourceNotFoundException;
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
                        new UsernameNotFoundException("User not found with email : " + email)
                );
        return UserPrincipal.create(user);
    }
    @Transactional
    public UserDetails loadUserById(Long id) {
        Trainer user = trainerRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("id", id)
        );
        return UserPrincipal.create(user);
    }

}