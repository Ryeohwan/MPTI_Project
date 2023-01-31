package mpti.authserver.security;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import mpti.authserver.api.request.LoginRequest;
import mpti.authserver.config.AppProperties;
import mpti.authserver.dao.UserRefreshTokenRepository;
import mpti.authserver.entity.UserRefreshToken;
import okhttp3.*;

import mpti.authserver.dto.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;


@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

    public static final MediaType JSON = MediaType.get("application/json; charset=utf-8");

    final private AppProperties appProperties;

    OkHttpClient client = new OkHttpClient();

    private final Gson gson;

    private final String USER = "ROLE_USER";
    private final String TRAINER = "ROLE_TRAINER";

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        // LoginRequest Dto 객체 생성
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail(email);
        String json = gson.toJson(loginRequest);

        ///////////////////////////////// 트레이너 DB 조회
        logger.info("트레이너 DB 조회");
        RequestBody requestBody = RequestBody.create(MediaType.get("application/json; charset=utf-8"), json);
        Request request = new Request.Builder()
                .url(appProperties.getAuth().getTrainerServerUrl() + "/login")
                .post(requestBody)
                .build();
        User responseUser = null;
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()){
                logger.error("응답에 실패했습니다");
            }else{
                String st = response.body().string();
                responseUser = gson.fromJson(st, User.class);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        if (responseUser == null) {
            logger.info(email + " 아이디는 트레이너 데이터 베이스에서 찾지 못했습니다: ");
        } else {
            return UserPrincipal.create(responseUser, TRAINER);
        }

        ///////////////////////////////// 유저 DB 조회
        logger.info("유저 DB 조회");

        logger.info("트레이너 DB 조회");
        requestBody = RequestBody.create(MediaType.get("application/json; charset=utf-8"), json);
        request = new Request.Builder()
                .url(appProperties.getAuth().getUserServerUrl() + "/login")
                .post(requestBody)
                .build();
        responseUser = null;
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()){
                logger.error("응답에 실패했습니다");
            }else{
                String st = response.body().string();
                responseUser = gson.fromJson(st, User.class);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        if (responseUser == null) {
            logger.info(email + " 아이디는 유저 데이터 베이스에서 찾지 못했습니다: ");
        } else {
            return UserPrincipal.create(responseUser, USER);
        }


        if (responseUser == null) {
            throw new UsernameNotFoundException(email + " 아이디는 회원가입을 하지 않는 사용자 입니다");
        } else {
            return UserPrincipal.create(responseUser, USER);
        }

        //return UserPrincipal.create(responseUser);
    }

}