package mpti.domain.trainer.api.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ApiResponse {
    private int code;
    private String message;

    public ApiResponse(int code, String message) {
        this.code = code;
        this.message = message;
    }

}
