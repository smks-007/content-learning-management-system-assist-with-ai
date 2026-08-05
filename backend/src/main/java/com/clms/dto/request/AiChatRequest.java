package com.clms.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.UUID;

@Data
public class AiChatRequest {
    @NotBlank private String message;
    private String sessionId;
    private UUID courseId;
    private UUID lessonId;
}
