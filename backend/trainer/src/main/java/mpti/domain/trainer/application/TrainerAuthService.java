package mpti.domain.trainer.application;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import lombok.RequiredArgsConstructor;

import mpti.domain.trainer.dao.TrainerRepository;
import mpti.domain.trainer.dto.IdDto;
import mpti.domain.trainer.dto.TokenDto;
import mpti.domain.trainer.dto.YearMonthDayDto;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainerAuthService {

    private final Gson gson;
    private OkHttpClient client = new OkHttpClient();

    @Value("${app.auth.authServerUrl}")
    private String AUTH_SERVER_URL;

    @Value("${app.auth.businessServerUrl}")
    private String BUSINESS_SERVER_URL;


//    public boolean isValidDB(String refreshToken) {
//
//        TokenDto tokenDto = new TokenDto();
//        tokenDto.setRefreshToken(refreshToken);
//        tokenDto.setState(false);
//
//        String json = gson.toJson(tokenDto);
//
//        RequestBody requestBody = RequestBody.create(MediaType.get("application/json; charset=utf-8"), json);
//        Request request = new Request.Builder()
//                .url(SERVER_URL + "/token")
//                .post(requestBody)
//                .build();
//
//        try (Response response = client.newCall(request).execute()) {
//            if (response.isSuccessful()){
//                String st = response.body().string();
//                tokenDto = gson.fromJson(st, TokenDto.class);
//            }
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//
//        return tokenDto.getState();
//    }

    public TokenDto getNewAccessToken(String refreshToken) {

        TokenDto tokenDto = new TokenDto();
        tokenDto.setRefreshToken(refreshToken);
        tokenDto.setState(false);

        String json = gson.toJson(tokenDto);

        RequestBody requestBody = RequestBody.create(MediaType.get("application/json; charset=utf-8"), json);
        Request request = new Request.Builder()
                .url(AUTH_SERVER_URL + "/token")
                .post(requestBody)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()){
                String st = response.body().string();
                tokenDto = gson.fromJson(st, TokenDto.class);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return tokenDto;
    }

    public List<IdDto> getTrainerIdList(String date) {


        YearMonthDayDto dayDto = new YearMonthDayDto();
        dayDto.setYear(Integer.parseInt(date.substring(0,4)));
        dayDto.setMonth(Integer.parseInt(date.substring(4,6)));
        dayDto.setDay(Integer.parseInt(date.substring(6)));

        String json = gson.toJson(dayDto);
        System.out.println(json);

        RequestBody requestBody = RequestBody.create(MediaType.get("application/json; charset=utf-8"), json);
        Request request = new Request.Builder()
                .url(BUSINESS_SERVER_URL + "/trainer/available/list")
                .post(requestBody)
                .build();
        Type type = new TypeToken<List<IdDto>>() {}.getType();
        List<IdDto> list = new ArrayList<>();

        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()){
                String st = response.body().string();
                System.out.println(st);
                list = gson.fromJson(st, type);
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return list;
    }
}