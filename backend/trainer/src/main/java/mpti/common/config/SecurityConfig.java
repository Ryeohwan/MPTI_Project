package mpti.common.config;

import mpti.common.security.ExceptionHandlerFilter;
import mpti.common.security.TokenAuthenticationFilter;
import mpti.common.security.TokenProvider;
import mpti.domain.trainer.application.TrainerAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig {
    @Autowired
    private TokenProvider tokenProvider;
    @Autowired
    private TrainerAuthService trainerAuthService;

//    @Bean
//    public  FilterRegistrationBean tokenAuthenticationFilterRegister() {
//        FilterRegistrationBean<TokenAuthenticationFilter> registrationBean = new FilterRegistrationBean<>(new TokenAuthenticationFilter(tokenProvider, trainerAuthService));
//        registrationBean.addUrlPatterns(
//                //ROLE_TRAINER
//                "/api/trainer/info/update",
//                "/api/trainer/upload",
//                // ROLE_ADMIN
//                "/api/trainer/info/delete/*",
//                "/api/trainer/application/process"
//        );
//        registrationBean.setOrder(1);
//        return registrationBean;
//    }
//
//    @Bean FilterRegistrationBean tokenExceptionHandlerFilterRegister() {
//        FilterRegistrationBean registrationBean = new FilterRegistrationBean(new ExceptionHandlerFilter());
//        registrationBean.setOrder(0);
//        return  registrationBean;
//    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity
                .headers()
                .xssProtection()
                .and()
                .contentSecurityPolicy("script-src 'self'");

        httpSecurity
                .cors()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .csrf()
                .disable()
                .formLogin()
                .disable()
                .httpBasic()
                .disable();

        return httpSecurity.build();
    }
}
