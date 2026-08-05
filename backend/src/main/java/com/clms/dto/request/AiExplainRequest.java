package com.clms.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AiExplainRequest {
    @NotBlank private String content;
    @NotBlank private String concept;
}
