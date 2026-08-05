package com.clms.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Map;
import java.util.UUID;

@Data
public class SubmitQuizRequest {
    @NotNull private UUID quizAttemptId;
    private Map<UUID, String> answers;

    public UUID getAttemptId() {
        return quizAttemptId;
    }
}
