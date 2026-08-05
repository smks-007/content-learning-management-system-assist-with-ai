package com.clms.ai;

import com.clms.dto.request.AiExplainRequest;
import com.clms.dto.response.AiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@Slf4j
public class LessonExplainService extends AiServiceBase {
    public AiResponse explain(AiExplainRequest request, UUID userId) {
        String system = "You are an expert educator who explains complex concepts in simple, engaging terms with real-world examples.";
        String prompt = "Explain the concept '" + request.getConcept() + "' from the following lesson content. Use simple language, provide 2-3 concrete examples, and include an analogy if helpful.\n\nContent:\n" + request.getContent();
        
        String response = callAi(system, prompt, userId, "/api/ai/explain");
        
        return AiResponse.builder()
            .content(response)
            .model("ollama")
            .tokensUsed(0)
            .build();
    }
}
