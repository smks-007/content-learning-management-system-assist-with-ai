package com.clms.ai;

import com.clms.dto.request.AiSummarizeRequest;
import com.clms.dto.response.AiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@Slf4j
public class LessonSummaryService extends AiServiceBase {
    public AiResponse summarize(AiSummarizeRequest request, UUID userId) {
        String system = "You are an expert educational content summarizer. Create clear, structured summaries that help students learn efficiently.";
        String prompt = "Please summarize the following lesson content in this structured format:\n\n" +
            "## Overview\n" +
            "(2-3 sentence summary)\n\n" +
            "## Key Concepts\n" +
            "(bullet points of main concepts)\n\n" +
            "## Main Takeaways\n" +
            "(3-5 actionable learning points)\n\n" +
            "## Study Tips\n" +
            "(2-3 specific tips for mastering this content)\n\n" +
            "Lesson Content:\n" + request.getContent();
        
        String response = callAi(system, prompt, userId, "/api/ai/summarize");
        
        return AiResponse.builder()
            .content(response)
            .model("ollama")
            .tokensUsed(0)
            .build();
    }
}
