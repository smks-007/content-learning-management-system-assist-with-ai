package com.clms.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AiCodeReviewRequest {
    @NotBlank private String code;
    private String language;
    private String error;
    private String context;
}
