package mpti.domain.reservation.api.request;

import lombok.Builder;
import lombok.Getter;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Getter
public class SchedulingRequest {

    private Long trainerId;

    private String trainerName;

    private int year;

    private int month;

    private int day;

    private List<Integer> openHours;

    public SchedulingRequest() {
    }

    @Builder
    public SchedulingRequest(Long trainerId, String trainerName, int year, int month, int day, List<Integer> openHours) {
        this.trainerId = trainerId;
        this.trainerName = trainerName;
        this.year = year;
        this.month = month;
        this.day = day;
        this.openHours = openHours;
    }
}
