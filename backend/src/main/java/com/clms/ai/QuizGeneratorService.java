package com.clms.ai;

import com.clms.dto.request.AiQuizGeneratorRequest;
import com.clms.dto.response.AiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@Slf4j
public class QuizGeneratorService extends AiServiceBase {
    public AiResponse generateQuiz(AiQuizGeneratorRequest request, UUID userId) {
        String system = "You are an expert quiz creator. Always respond with ONLY valid JSON, no additional text.";
        String prompt = "Generate " + request.getCount() + " " + request.getDifficulty() + " difficulty quiz questions about the following content. Return ONLY a JSON array with this exact structure:\n" +
            "[{\"questionText\": \"...\", \"questionType\": \"MCQ\", \"points\": 1, \"options\": [{\"optionText\": \"...\", \"isCorrect\": false}, ...], \"explanation\": \"...\"}]\n\nContent:\n" + request.getContent();
        
        String response = callAi(system, prompt, userId, "/api/ai/quiz");
        
        return AiResponse.builder()
            .content(response)
            .model("ollama")
            .tokensUsed(0)
            .build();
    }
}
