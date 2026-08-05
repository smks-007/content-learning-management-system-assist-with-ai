package com.clms.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class CreateQuizRequest {
    @NotBlank private String title;
    private String description;
    @NotNull private UUID courseId;
    private UUID lessonId;
    private int timeLimit = 30;
    private int passingScore = 70;
    private int maxAttempts = 3;
}
