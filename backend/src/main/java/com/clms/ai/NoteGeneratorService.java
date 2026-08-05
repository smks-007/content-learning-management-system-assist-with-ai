package com.clms.ai;

import com.clms.dto.request.AiSummarizeRequest;
import com.clms.dto.response.AiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@Slf4j
public class NoteGeneratorService extends AiServiceBase {
    public AiResponse generateNotes(AiSummarizeRequest request, UUID userId) {
        String system = "You are an expert at creating structured markdown notes from lesson content.";
        String prompt = "Generate detailed structured markdown notes from the following content:\n\n" + request.getContent();
        String response = callAi(system, prompt, userId, "/api/ai/notes");
        return AiResponse.builder().content(response).model("ollama").tokensUsed(0).build();
    }
}
