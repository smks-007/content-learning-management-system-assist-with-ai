package com.clms.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class CreateNotificationRequest {
    @NotNull private UUID userId;
    @NotBlank private String title;
    private String message;
    private String type = "INFO";
    private String actionUrl;
}
