package mpti.domain.reservation.api.request;

import lombok.Getter;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Getter
public class SchedulingRequest {

    private Long trainerId;

    private int year;

    private int month;

    private int day;

    private List<Integer> openHours;

}
