package mpti.common.config;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.filter.CorsFilter;


@Configuration
@EnableWebSecurity // 시큐리티 활성화 => 기본 스프링 필터체인에 등록
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CorsFilter corsFilter;
//
//    private final UserRepository userRepository;
//    @Bean
//    public BCryptPasswordEncoder passwordEncoder(){
//        return new BCryptPasswordEncoder();
//    }

//    @Bean
//    @Override
//    public AuthenticationManager authenticationManagerBean() throws Exception {
//        return super.authenticationManagerBean();
//    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

//        http.addFilterBefore(new MyFilter3(), BasicAuthenticationFilter.class); // SecurityFilterChain 중에 Filter 선택 가능
        // 어떤 필터 전에 특정 필터를 걸때 사용
        // 시큐리티 필터 체인이 내가 임의로 만든 필터보다 먼저 동작함
        // 시큐리티 필터보다 먼저 필터가 걸리게 하려면 addFilterBefore 를 걸어야함


        http
                .addFilter(corsFilter) // @CrossOrigin (인증X), 시큐리티 필터에 등록 인증 (O)
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 내 서버는 stateless 세션 사용 X
                .and()
                .formLogin().disable()  // 폼태그로 로그인하는거 안한다...
                .httpBasic().disable();
//                .addFilter(new JwtAuthenticationFilter(authenticationManager())) // AuthenticationFilter
//                .addFilter(new JwtAuthorizationFilter(authenticationManager(),userRepository)) // AuthenticationFilter
//                .authorizeRequests()
//                .antMatchers("/api/v1/user/**")
//                .access("hasRole('ROLE_USER') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
//                .antMatchers("/api/v1/manager/**")
//                .access("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
//                .antMatchers("/api/v1/admin/**")
//                .access("hasRole('ROLE_ADMIN')")
//                .anyRequest().permitAll();
    }
}
