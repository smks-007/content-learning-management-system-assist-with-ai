package com.clms.ai;

import com.clms.dto.request.AiChatRequest;
import com.clms.dto.response.AiResponse;
import com.clms.entity.ChatHistory;
import com.clms.repository.ChatHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class AiChatService extends AiServiceBase {
    private final ChatHistoryRepository chatHistoryRepository;
    
    public AiResponse chat(AiChatRequest request, UUID userId) {
        String sessionId = request.getSessionId() != null ? request.getSessionId() : UUID.randomUUID().toString();
        
        List<ChatHistory> history = chatHistoryRepository
            .findByUserIdAndSessionIdOrderByCreatedAtAsc(userId, sessionId)
            .stream().limit(10).toList();
        
        StringBuilder context = new StringBuilder();
        for (ChatHistory h : history) {
            context.append("Student: ").append(h.getMessage()).append("\nAssistant: ").append(h.getResponse()).append("\n\n");
        }
        
        String systemPrompt = "You are CLMS AI, an intelligent and encouraging learning assistant for an online education platform.\n" +
            "Help students understand concepts, answer questions about their courses, provide study tips, and explain topics clearly.\n" +
            "Be concise, accurate, and supportive. Use markdown formatting for code and structured answers.";
        
        String userPrompt = (context.length() > 0 ? "Previous conversation:\n" + context + "\n" : "") +
            "Student: " + request.getMessage();
        
        String response = callAi(systemPrompt, userPrompt, userId, "/api/ai/chat");
        
        ChatHistory chatHistory = new ChatHistory();
        chatHistory.setUserId(userId);
        chatHistory.setSessionId(sessionId);
        chatHistory.setMessage(request.getMessage());
        chatHistory.setResponse(response);
        chatHistory.setModel("ollama");
        chatHistoryRepository.save(chatHistory);
        
        return AiResponse.builder()
            .content(response)
            .sessionId(sessionId)
            .model("ollama")
            .tokensUsed(0)
            .build();
    }
}
