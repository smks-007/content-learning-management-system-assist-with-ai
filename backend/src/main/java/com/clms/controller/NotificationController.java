package com.clms.controller;

import com.clms.dto.request.CreateNotificationRequest;
import com.clms.dto.response.ApiResponse;
import com.clms.dto.response.NotificationDto;
import com.clms.service.NotificationService;
import com.clms.util.SecurityUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.UUID;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@Tag(name = "Notification", description = "Notification APIs")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Page<NotificationDto>>> getNotifications(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(notificationService.getNotifications(SecurityUtils.getCurrentUserId(), pageable)));
    }

    @PutMapping("/{id}/read")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Void>> markAsRead(@PathVariable UUID id) {
        notificationService.markAsRead(id, SecurityUtils.getCurrentUserId());
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @PutMapping("/read-all")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Void>> markAllAsRead() {
        notificationService.markAllAsRead(SecurityUtils.getCurrentUserId());
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Void>> deleteNotification(@PathVariable UUID id) {
        notificationService.deleteNotification(id, SecurityUtils.getCurrentUserId());
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> createNotification(@Valid @RequestBody CreateNotificationRequest request) {
        notificationService.createNotification(request);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
