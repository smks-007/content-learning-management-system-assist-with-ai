package com.clms.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AiQuizGeneratorRequest {
    @NotBlank private String content;
    private int count = 5;
    private String difficulty = "MEDIUM";
}
