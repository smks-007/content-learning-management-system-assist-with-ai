package com.clms.controller;

import com.clms.dto.request.CreateQuizRequest;
import com.clms.dto.request.SubmitQuizRequest;
import com.clms.dto.response.ApiResponse;
import com.clms.dto.response.LeaderboardEntryDto;
import com.clms.dto.response.QuizAttemptDto;
import com.clms.dto.response.QuizDto;
import com.clms.dto.response.QuizResultDto;
import com.clms.service.QuizService;
import com.clms.util.SecurityUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
@Tag(name = "Quiz", description = "Quiz APIs")
public class QuizController {

    private final QuizService quizService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<QuizDto>>> getQuizzesByCourse(@RequestParam UUID courseId) {
        return ResponseEntity.ok(ApiResponse.success(quizService.getQuizzesByCourse(courseId)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<QuizDto>> getQuizById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(quizService.getQuizById(id)));
    }

    @PostMapping
    @PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<QuizDto>> createQuiz(@Valid @RequestBody CreateQuizRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(quizService.createQuiz(request)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<QuizDto>> updateQuiz(@PathVariable UUID id, @Valid @RequestBody CreateQuizRequest request) {
        return ResponseEntity.ok(ApiResponse.success(quizService.updateQuiz(id, request)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteQuiz(@PathVariable UUID id) {
        quizService.deleteQuiz(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @PostMapping("/{id}/start")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<QuizAttemptDto>> startAttempt(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(quizService.startAttempt(id, SecurityUtils.getCurrentUserId())));
    }

    @PostMapping("/submit")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<QuizResultDto>> submitQuiz(@Valid @RequestBody SubmitQuizRequest request) {
        return ResponseEntity.ok(ApiResponse.success(quizService.submitQuiz(request, SecurityUtils.getCurrentUserId())));
    }

    @GetMapping("/results/{attemptId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<QuizResultDto>> getResults(@PathVariable UUID attemptId) {
        return ResponseEntity.ok(ApiResponse.success(quizService.getResults(attemptId, SecurityUtils.getCurrentUserId())));
    }

    @GetMapping("/leaderboard/{quizId}")
    public ResponseEntity<ApiResponse<List<LeaderboardEntryDto>>> getLeaderboard(@PathVariable UUID quizId) {
        return ResponseEntity.ok(ApiResponse.success(quizService.getLeaderboard(quizId)));
    }
}
