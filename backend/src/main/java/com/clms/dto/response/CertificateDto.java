package com.clms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class CertificateDto {
    private UUID id;
    private UUID studentId;
    private String studentName;
    private UUID courseId;
    private String courseName;
    private LocalDateTime issuedAt;
    private String certificateUrl;
    private String verificationCode;
    private boolean isValid;
}
