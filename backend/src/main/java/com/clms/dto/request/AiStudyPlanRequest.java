package com.clms.dto.request;

import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class AiStudyPlanRequest {
    private UUID courseId;
    private double availableHoursPerDay = 2.0;
    private LocalDate startDate;
    private LocalDate endDate;
    private String goals;

    public double getHoursPerDay() {
        return availableHoursPerDay;
    }
}
