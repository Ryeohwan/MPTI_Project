package mpti.authserver.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OAuth2Response {
    private String accessExpiryDate;
    private String refreshExpiryDate;

    private String access_token;
    private String refresh_token;

    public OAuth2Response(String accessExpiryDate, String refreshExpiryDate, String access_token, String refresh_token) {
        this.accessExpiryDate = accessExpiryDate;
        this.refreshExpiryDate = refreshExpiryDate;
        this.access_token = access_token;
        this.refresh_token = refresh_token;
    }
}
