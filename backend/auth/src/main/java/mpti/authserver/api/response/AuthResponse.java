package mpti.authserver.api.response;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AuthResponse {
    private String accessExpiryDate;
    private String refreshExpiryDate;

    public AuthResponse(String accessExpiryDate, String refreshExpiryDate) {
        this.accessExpiryDate = accessExpiryDate;
        this.refreshExpiryDate = refreshExpiryDate;
    }

    public AuthResponse(String accessExpiryDate) {
        this.accessExpiryDate = accessExpiryDate;
    }
}
