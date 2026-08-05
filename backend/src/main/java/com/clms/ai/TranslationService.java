package com.clms.ai;

import com.clms.dto.request.AiTranslateRequest;
import com.clms.dto.response.AiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@Slf4j
public class TranslationService extends AiServiceBase {
    public AiResponse translate(AiTranslateRequest request, UUID userId) {
        String system = "You are a professional educational translator. Translate content accurately while maintaining the educational tone and formatting.";
        String prompt = "Translate the following educational content to " + request.getTargetLanguage() + ". Preserve all markdown formatting, code blocks, and technical terms (add original term in parentheses where helpful).\n\n" + request.getContent();
        
        String response = callAi(system, prompt, userId, "/api/ai/translate");
        
        return AiResponse.builder()
            .content(response)
            .model("ollama")
            .tokensUsed(0)
            .build();
    }
}
