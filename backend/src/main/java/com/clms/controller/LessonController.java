package com.clms.controller;

import com.clms.dto.request.CreateLessonRequest;
import com.clms.dto.response.ApiResponse;
import com.clms.dto.response.LessonDto;
import com.clms.dto.response.ProgressDto;
import com.clms.service.LessonService;
import com.clms.util.SecurityUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
@Tag(name = "Lesson", description = "Lesson APIs")
public class LessonController {
    
    private final LessonService lessonService;

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<LessonDto>> getLessonById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(lessonService.getLessonById(id, SecurityUtils.getCurrentUserId())));
    }

    @PostMapping
    @PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<LessonDto>> createLesson(@Valid @RequestBody CreateLessonRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(lessonService.createLesson(request, SecurityUtils.getCurrentUserId())));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<LessonDto>> updateLesson(@PathVariable UUID id, @Valid @RequestBody CreateLessonRequest request) {
        return ResponseEntity.ok(ApiResponse.success(lessonService.updateLesson(id, request)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteLesson(@PathVariable UUID id) {
        lessonService.deleteLesson(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @PostMapping("/{id}/progress")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<ProgressDto>> updateProgress(@PathVariable UUID id, @RequestBody Map<String, Integer> body) {
        Integer watchedDuration = body.getOrDefault("watchedDuration", 0);
        return ResponseEntity.ok(ApiResponse.success(lessonService.updateProgress(id, SecurityUtils.getCurrentUserId(), watchedDuration)));
    }

    @PostMapping("/{id}/upload-video")
    @PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> uploadVideo(@PathVariable UUID id, @RequestParam("file") MultipartFile file) {
        lessonService.uploadVideo(id, file, SecurityUtils.getCurrentUserId());
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @PostMapping("/{id}/upload-pdf")
    @PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> uploadPdf(@PathVariable UUID id, @RequestParam("file") MultipartFile file) {
        lessonService.uploadPdf(id, file, SecurityUtils.getCurrentUserId());
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
