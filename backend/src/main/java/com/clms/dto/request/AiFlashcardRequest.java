package com.clms.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AiFlashcardRequest {
    @NotBlank private String content;
    private int numberOfCards = 10;

    public int getCount() {
        return numberOfCards;
    }
}
