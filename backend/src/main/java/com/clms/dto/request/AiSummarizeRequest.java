package com.clms.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.UUID;

@Data
public class AiSummarizeRequest {
    @NotBlank private String content;
    private UUID lessonId;
}
