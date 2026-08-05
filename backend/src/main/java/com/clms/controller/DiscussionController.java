package com.clms.controller;

import com.clms.dto.request.CreateDiscussionRequest;
import com.clms.dto.response.ApiResponse;
import com.clms.dto.response.CommentDto;
import com.clms.dto.response.DiscussionDto;
import com.clms.service.DiscussionService;
import com.clms.util.SecurityUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/discussions")
@RequiredArgsConstructor
@Tag(name = "Discussion", description = "Discussion APIs")
public class DiscussionController {

    private final DiscussionService discussionService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<DiscussionDto>>> getDiscussionsByCourse(@RequestParam UUID courseId, Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.getDiscussionsByCourse(courseId, pageable)));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<DiscussionDto>> createDiscussion(@Valid @RequestBody CreateDiscussionRequest request) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.createDiscussion(request, SecurityUtils.getCurrentUserId())));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DiscussionDto>> getDiscussionById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.getDiscussionById(id)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<DiscussionDto>> updateDiscussion(@PathVariable UUID id, @Valid @RequestBody CreateDiscussionRequest request) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.updateDiscussion(id, request, SecurityUtils.getCurrentUserId())));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Void>> deleteDiscussion(@PathVariable UUID id) {
        discussionService.deleteDiscussion(id, SecurityUtils.getCurrentUserId());
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @PostMapping("/{id}/comments")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<CommentDto>> addComment(@PathVariable UUID id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.addComment(id, body.get("content"), SecurityUtils.getCurrentUserId())));
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<ApiResponse<List<CommentDto>>> getComments(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.getComments(id)));
    }
}
