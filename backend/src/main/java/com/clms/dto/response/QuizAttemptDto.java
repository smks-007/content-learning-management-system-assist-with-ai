package com.clms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class QuizAttemptDto {
    private UUID id;
    private UUID quizId;
    private String quizTitle;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    private double score;
    private boolean isPassed;
    private Integer timeTaken;
}
