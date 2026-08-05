package com.clms.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AiQuizGenerateRequest {
    @NotBlank private String content;
    private int numberOfQuestions = 5;
    private String difficulty = "MEDIUM";
}
