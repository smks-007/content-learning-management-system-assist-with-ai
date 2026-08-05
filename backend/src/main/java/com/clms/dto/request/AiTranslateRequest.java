package com.clms.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AiTranslateRequest {
    @NotBlank private String content;
    @NotBlank private String targetLanguage;
}
