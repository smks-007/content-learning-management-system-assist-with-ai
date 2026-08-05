package com.clms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class QuestionDto {
    private UUID id;
    private UUID quizId;
    private String questionText;
    private String questionType;
    private int orderIndex;
    private int points;
    private List<OptionDto> options;
    private String explanation; // only shown after attempt
    private String correctAnswer; // only shown after attempt
}
