package com.clms.ai;

import com.clms.dto.request.AiFlashcardRequest;
import com.clms.dto.response.AiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@Slf4j
public class FlashcardService extends AiServiceBase {
    public AiResponse generateFlashcards(AiFlashcardRequest request, UUID userId) {
        String system = "You are an expert at creating educational flashcards. Always respond with ONLY valid JSON.";
        String prompt = "Create " + request.getCount() + " flashcards from the following content. Return ONLY a JSON array: [{\"front\": \"question or term\", \"back\": \"answer or definition\"}]\n\nContent:\n" + request.getContent();
        
        String response = callAi(system, prompt, userId, "/api/ai/flashcards");
        
        return AiResponse.builder()
            .content(response)
            .model("ollama")
            .tokensUsed(0)
            .build();
    }
}
