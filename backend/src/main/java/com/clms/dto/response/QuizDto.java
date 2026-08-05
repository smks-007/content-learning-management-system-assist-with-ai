package com.clms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class QuizDto {
    private UUID id;
    private String title;
    private String description;
    private UUID courseId;
    private UUID lessonId;
    private int timeLimit;
    private int passingScore;
    private int maxAttempts;
    private boolean isPublished;
    private int questionCount;
    private int attemptCount;
    private List<QuestionDto> questions;
}
