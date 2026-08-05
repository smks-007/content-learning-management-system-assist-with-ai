package com.clms.ai;

import com.clms.dto.response.AiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@Slf4j
public class AiReportService extends AiServiceBase {
    public AiResponse generateReportNarrative(String reportData, UUID userId) {
        String system = "You are an expert at writing concise analytical report narratives.";
        String prompt = "Generate an AI narrative paragraph for this report given structured data:\n\n" + reportData;
        String response = callAi(system, prompt, userId, "/api/ai/report");
        return AiResponse.builder().content(response).model("ollama").tokensUsed(0).build();
    }
}
