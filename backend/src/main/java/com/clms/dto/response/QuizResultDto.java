package com.clms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class QuizResultDto {
    private UUID attemptId;
    private String quizTitle;
    private double score;
    private boolean isPassed;
    private int totalPoints;
    private int earnedPoints;
    private Integer timeTaken;
    private List<QuestionResultDto> questionResults;
}
