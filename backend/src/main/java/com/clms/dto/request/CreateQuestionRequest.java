package com.clms.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class CreateQuestionRequest {
    @NotNull private UUID quizId;
    @NotBlank private String questionText;
    private String questionType = "MCQ";
    private int orderIndex = 0;
    private int points = 1;
    private String explanation;
    private List<CreateOptionRequest> options;
    private String correctAnswer;
}
