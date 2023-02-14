package mpti.common.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import mpti.common.errors.TokenNotFoundException;
import mpti.domain.trainer.application.TrainerAuthService;
import mpti.domain.trainer.dto.TokenDto;
import org.hibernate.annotations.Filter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class TokenAuthenticationFilter extends OncePerRequestFilter {
    private TokenProvider tokenProvider;
    private TrainerAuthService trainerAuthService;

    private static final Logger logger = LoggerFactory.getLogger(TokenAuthenticationFilter.class);

    @Value("${app.auth.tokenSecret:}")
    private String SECRET_KEY;

    private static final String AUTHORITIES_KEY = "auth";

    public TokenAuthenticationFilter(TokenProvider tokenProvider, TrainerAuthService trainerAuthService) {
        this.tokenProvider = tokenProvider;
        this.trainerAuthService = trainerAuthService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException, TokenNotFoundException, ExpiredJwtException {

        try {
            String accessToken = getJwtFromRequest(request);
            String refreshToken = getRefreshJwtFromRequest(request);

            if (!StringUtils.hasText(accessToken) ) {
                throw new TokenNotFoundException("Access 토큰을 찾을 수 없습니다");
            }

            if( tokenProvider.validateToken(accessToken)) {

//                Authentication auth = tokenProvider.getAuthentication(accessToken);// 인증 객체 생성
                UsernamePasswordAuthenticationToken authentication = tokenProvider.getAuthentication(accessToken);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);


            } else if( tokenProvider.isExpiredToken(accessToken)) {
                logger.info("Access token is expired");
                if(tokenProvider.validateToken(refreshToken)) {
                    // Redis DB에 확인

                    TokenDto tokenDto = trainerAuthService.getNewAccessToken(refreshToken);
                    if(tokenDto.getState() == false) {
                        throw new ExpiredJwtException(null, null, "Refresh 토큰이 만료되었습니다 다시 로그인 해주세요");
                    } else {
                        // Redis DB 확인 완료 후 access token 재발급 -> 인증 서버에서
                        accessToken = tokenDto.getAccessToken();
                        UsernamePasswordAuthenticationToken authentication = tokenProvider.getAuthentication(accessToken);
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        response.setHeader("Authorization", "Bearer " + accessToken);
                    }

                } else {
                    throw new JwtException("Refresh 토큰이 유효하지 않습니다");
                }
            }
        } catch (Exception ex) {
            logger.error("Could not set user authentication in security context", ex);
            throw new IllegalArgumentException(ex);
        }

        logger.info("토큰 검사 완료");
        filterChain.doFilter(request, response);

    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }

    private String getRefreshJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Refresh-token");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }

}
