package com.clms.controller;

import com.clms.dto.request.*;
import com.clms.dto.response.ApiResponse;
import com.clms.dto.response.AiResponse;
import com.clms.ai.*;
import com.clms.util.SecurityUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
@Tag(name = "AI", description = "AI powered APIs")
public class AiController {

    private final AiChatService aiChatService;
    private final LessonSummaryService lessonSummaryService;
    private final LessonExplainService lessonExplainService;
    private final TranslationService translationService;
    private final FlashcardService flashcardService;
    private final QuizGeneratorService quizGeneratorService;

    @PostMapping("/chat")
    public ResponseEntity<ApiResponse<AiResponse>> chat(@Valid @RequestBody AiChatRequest request) {
        return ResponseEntity.ok(ApiResponse.success(aiChatService.chat(request, SecurityUtils.getCurrentUserId())));
    }

    @PostMapping("/summarize")
    public ResponseEntity<ApiResponse<AiResponse>> summarize(@Valid @RequestBody AiSummarizeRequest request) {
        return ResponseEntity.ok(ApiResponse.success(lessonSummaryService.summarize(request, SecurityUtils.getCurrentUserId())));
    }

    @PostMapping("/explain")
    public ResponseEntity<ApiResponse<AiResponse>> explain(@Valid @RequestBody AiExplainRequest request) {
        return ResponseEntity.ok(ApiResponse.success(lessonExplainService.explain(request, SecurityUtils.getCurrentUserId())));
    }

    @PostMapping("/translate")
    public ResponseEntity<ApiResponse<AiResponse>> translate(@Valid @RequestBody AiTranslateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(translationService.translate(request, SecurityUtils.getCurrentUserId())));
    }

    @PostMapping("/flashcards")
    public ResponseEntity<ApiResponse<AiResponse>> flashcards(@Valid @RequestBody AiFlashcardRequest request) {
        return ResponseEntity.ok(ApiResponse.success(flashcardService.generateFlashcards(request, SecurityUtils.getCurrentUserId())));
    }

    @PostMapping("/quiz")
    public ResponseEntity<ApiResponse<AiResponse>> quiz(@Valid @RequestBody AiQuizGeneratorRequest request) {
        return ResponseEntity.ok(ApiResponse.success(quizGeneratorService.generateQuiz(request, SecurityUtils.getCurrentUserId())));
    }
}
