package com.clms.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AiSearchRequest {
    @NotBlank private String query;
    private String context;
}
