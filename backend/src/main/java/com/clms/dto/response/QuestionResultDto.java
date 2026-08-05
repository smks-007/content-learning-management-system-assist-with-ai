package com.clms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class QuestionResultDto {
    private UUID questionId;
    private String questionText;
    private String userAnswer;
    private String correctAnswer;
    private boolean isCorrect;
    private int points;
    private int earnedPoints;
    private String explanation;
    private String aiExplanation;
}
