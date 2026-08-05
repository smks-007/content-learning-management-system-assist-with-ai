package com.clms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ReportDto {
    private String reportType;
    private LocalDateTime generatedAt;
    private UUID studentId;
    private UUID courseId;
    private Map<String, Object> data;
    private String aiNarrative;
}
