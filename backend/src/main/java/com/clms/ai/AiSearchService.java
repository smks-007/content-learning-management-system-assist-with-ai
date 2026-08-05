package com.clms.ai;

import com.clms.dto.request.AiSearchRequest;
import com.clms.dto.response.AiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@Slf4j
public class AiSearchService extends AiServiceBase {
    public AiResponse search(AiSearchRequest request, UUID userId) {
        String system = "You are an intelligent search assistant for an educational platform.";
        String prompt = "Search Query: " + request.getQuery() + "\nContext: " + request.getContext() + "\nProvide relevant information.";
        String response = callAi(system, prompt, userId, "/api/ai/search");
        return AiResponse.builder().content(response).model("ollama").tokensUsed(0).build();
    }
}
