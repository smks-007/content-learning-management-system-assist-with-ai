package com.clms.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class CreateDiscussionRequest {
    @NotNull private UUID courseId;
    @NotBlank private String title;
    private String content;
}
