package com.clms.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data @Builder
public class EnrollmentDto {
    private UUID id;
    private UUID studentId;
    private UUID courseId;
    private String courseName;
    private String courseThumbnail;
    private LocalDateTime enrolledAt;
    private LocalDateTime completedAt;
    private String status;
    private int progress;
}
