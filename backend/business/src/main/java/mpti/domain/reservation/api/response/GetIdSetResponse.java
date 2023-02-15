package mpti.domain.reservation.api.response;

import lombok.Data;

@Data
public class GetIdSetResponse {

    private Long id;

    private String name;

    public GetIdSetResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
