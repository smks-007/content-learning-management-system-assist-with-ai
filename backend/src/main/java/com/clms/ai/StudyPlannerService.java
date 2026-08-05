package com.clms.ai;

import com.clms.dto.request.AiStudyPlanRequest;
import com.clms.dto.response.AiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@Slf4j
public class StudyPlannerService extends AiServiceBase {
    public AiResponse generateStudyPlan(AiStudyPlanRequest request, UUID userId) {
        String system = "You are an expert educational planner.";
        String prompt = "Generate a weekly study plan for goals: " + request.getGoals() + " with " + request.getHoursPerDay() + " hours per day.";
        String response = callAi(system, prompt, userId, "/api/ai/study-plan");
        return AiResponse.builder().content(response).model("ollama").tokensUsed(0).build();
    }
}
