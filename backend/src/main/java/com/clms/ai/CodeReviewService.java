package com.clms.ai;

import com.clms.dto.request.AiCodeReviewRequest;
import com.clms.dto.response.AiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@Slf4j
public class CodeReviewService extends AiServiceBase {
    
    public AiResponse reviewCode(AiCodeReviewRequest request, UUID userId) {
        String system = "You are an expert software engineer reviewing code. Provide comprehensive review with issues and suggestions.";
        String prompt = "Review the following code:\n\n" + request.getCode();
        String response = callAi(system, prompt, userId, "/api/ai/code-review");
        return AiResponse.builder().content(response).model("ollama").tokensUsed(0).build();
    }
    
    public AiResponse debugCode(AiCodeReviewRequest request, UUID userId) {
        String system = "You are an expert debugger. Identify bugs and provide fixes.";
        String prompt = "Debug the following code:\n\n" + request.getCode();
        String response = callAi(system, prompt, userId, "/api/ai/debug");
        return AiResponse.builder().content(response).model("ollama").tokensUsed(0).build();
    }
    
    public AiResponse explainCode(AiCodeReviewRequest request, UUID userId) {
        String system = "You are an expert educator. Explain code in plain English.";
        String prompt = "Explain the following code:\n\n" + request.getCode();
        String response = callAi(system, prompt, userId, "/api/ai/explain-code");
        return AiResponse.builder().content(response).model("ollama").tokensUsed(0).build();
    }
}
