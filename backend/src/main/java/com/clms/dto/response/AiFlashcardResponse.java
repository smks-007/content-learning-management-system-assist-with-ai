package com.clms.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data @Builder
public class AiFlashcardResponse {
    private List<FlashcardDto> flashcards;
    private String sessionId;
    private int totalCards;
}
