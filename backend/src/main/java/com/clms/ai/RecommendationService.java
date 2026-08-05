package com.clms.ai;

import com.clms.dto.response.AiResponse;
import com.clms.repository.CourseRepository;
import com.clms.repository.EnrollmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendationService extends AiServiceBase {
    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;

    public AiResponse getRecommendations(UUID userId) {
        String titles = enrollmentRepository.findByStudentId(userId).stream()
                .map(e -> e.getCourse().getTitle())
                .collect(Collectors.joining(", "));
                
        String system = "You are an expert academic advisor.";
        String prompt = "A student is enrolled in these courses: [" + titles + "]. Based on their learning path, recommend 5 specific course topics or skills they should learn next. Be specific and explain why each recommendation is valuable.";
        
        String response = callAi(system, prompt, userId, "/api/ai/recommend");
        return AiResponse.builder().content(response).model("ollama").tokensUsed(0).build();
    }
}
