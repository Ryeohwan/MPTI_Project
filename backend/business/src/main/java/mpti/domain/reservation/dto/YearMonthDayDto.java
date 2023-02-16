package mpti.domain.reservation.dto;

import lombok.Getter;

@Getter
public class YearMonthDayDto {

    private int year;
    private int month;
    private int day;

    public YearMonthDayDto(int year, int month, int day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }
}
