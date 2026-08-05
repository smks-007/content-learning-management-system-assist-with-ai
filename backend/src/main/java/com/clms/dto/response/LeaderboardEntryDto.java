package com.clms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class LeaderboardEntryDto {
    private int rank;
    private UUID studentId;
    private String studentName;
    private String studentAvatar;
    private double score;
    private Integer timeTaken;
    private LocalDateTime completedAt;
}
