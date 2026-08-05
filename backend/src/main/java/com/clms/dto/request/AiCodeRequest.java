package com.clms.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AiCodeRequest {
    @NotBlank private String code;
    @NotBlank private String language;
    private String error;
    private String context;
}
