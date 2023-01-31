package mpti.authserver.api;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import mpti.authserver.api.request.LoginRequest;
import mpti.authserver.api.response.ApiResponse;
import mpti.authserver.api.response.AuthResponse;
import mpti.authserver.config.AppProperties;
import mpti.authserver.dao.UserRefreshTokenRepository;
import mpti.authserver.entity.Role;
import mpti.authserver.entity.UserRefreshToken;
import mpti.authserver.security.TokenProvider;
import okhttp3.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import javax.validation.Valid;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.springframework.http.HttpHeaders.SET_COOKIE;
import static org.springframework.security.oauth2.core.endpoint.OAuth2ParameterNames.*;
import static org.springframework.security.oauth2.core.endpoint.OAuth2ParameterNames.ACCESS_TOKEN;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    public static final MediaType JSON = MediaType.get("application/json; charset=utf-8");

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private AppProperties appProperties;


    @Autowired
    private UserRefreshTokenRepository userRefreshTokenRepository;

    /**
     * 일반로그인
     * @param loginRequest
     * @return ApiResponse
     * @throws Exception
     */
    @PostMapping("/login")
    @Transactional
    public ResponseEntity<AuthResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) throws  Exception{

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 토큰 새성
        String accessToken = tokenProvider.createAccessToken(authentication);
        String refreshToken = tokenProvider.createRefreshToken(authentication);

        // 토큰 DB에 저장
        UserRefreshToken tempuserRefreshToken = new UserRefreshToken(authentication.getName(), refreshToken, authentication.getAuthorities());
        String userEmail = tempuserRefreshToken.getUserEmail();
        UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserEmail(userEmail);


        if (userRefreshToken == null) {
            //
//            List<GrantedAuthority> authorities = Collections.
//                    singletonList(new SimpleGrantedAuthority("ROLE_USER"));
            userRefreshToken = new UserRefreshToken(userEmail, refreshToken, authentication.getAuthorities());

            userRefreshTokenRepository.saveAndFlush(userRefreshToken);
            logger.info("[일반 로그인] 토큰을 디비에 새로 생성");
        } else {
            userRefreshToken.setRefreshToken(refreshToken);
            userRefreshTokenRepository.flush();
            logger.info("[일반 로그인] 토큰을 기존의 값 update");
        }
        logger.info("[일반 로그인]" + REFRESH_TOKEN + "을 DB에 저장 성공");

        // response
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Refresh-token", "Bearer " + refreshToken);

        Date now = new Date();
        Date accessTokenExpiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpirationMsec());
        Date refreshTokenExpiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenRefreshExpirationMsec());

        logger.info(now.toString());
        logger.info(accessTokenExpiryDate.toString());

        logger.info("[일반 로그인] 성공");
        return ResponseEntity.ok()
                .headers(headers)
                .body(new AuthResponse(accessTokenExpiryDate.toString(), refreshTokenExpiryDate.toString()));
    }

    @GetMapping("/token")
    public ResponseEntity<?> renewAccessToken(HttpServletRequest request, HttpServletResponse response) {


        String accessToken = "";

        // Refresh 토큰이 만료됐는지 확인
        try {
            String refreshToken = tokenProvider.getJwtRefreshFromRequest(request);
            logger.info(refreshToken);

            // refresh 토큰이 죽어 있을때
            if (!StringUtils.hasText(refreshToken) || !tokenProvider.validateToken(refreshToken)) {

                return ResponseEntity.internalServerError().body(
                        new ApiResponse(false, "refresh 토큰이 만료 되었습니다"));

            }


            // DB에 그 refresh 토큰이 있는 확인한다
            String userEmail = tokenProvider.getUserEmailFromToken(refreshToken);
            logger.info(userEmail + "디비에서 토큰 찾기");
            UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserEmail(userEmail);
            String role = userRefreshToken.getRole();

            if(userRefreshToken == null || !userRefreshToken.getUserEmail().equals(userEmail)) {
                return ResponseEntity.internalServerError().body(
                        new ApiResponse(false, "잘못된 refresh 토큰입니다"));
            }

            logger.info("refresh token : " + refreshToken);
            logger.info("email" + userEmail);
            logger.info(userRefreshToken.toString());


            accessToken = tokenProvider.renewAccessToken(userEmail, role);


        } catch (Exception ex) {
            logger.error("security context에서 authentication 객체를 찾을 수 없습니다", ex);
        }

        // response
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        Date now = new Date();
        Date accessTokenExpiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpirationMsec());

        logger.info("[Access 토큰 발급] 성공");
        return ResponseEntity.ok()
                .headers(headers)
                .body(new AuthResponse(accessTokenExpiryDate.toString()));

    }

    @PostMapping("/logout")
    @Transactional
    public ResponseEntity<?> logout(HttpServletResponse response, HttpServletRequest request) {
        String refreshToken = tokenProvider.getJwtRefreshFromRequest(request);
        String userEmail = tokenProvider.getUserEmailFromToken(refreshToken);
        UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserEmail(userEmail);
        userRefreshTokenRepository.delete(userRefreshToken);
        userRefreshTokenRepository.flush();

        return ResponseEntity.ok(new ApiResponse(true, "로그아웃 성공"));
    }

}
