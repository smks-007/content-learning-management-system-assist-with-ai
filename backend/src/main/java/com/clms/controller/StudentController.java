package com.clms.controller;

import com.clms.dto.request.UpdateProfileRequest;
import com.clms.dto.response.ApiResponse;
import com.clms.dto.response.DashboardDto;
import com.clms.dto.response.UserDto;
import com.clms.service.CertificateService;
import com.clms.service.CourseService;
import com.clms.service.ProgressService;
import com.clms.service.UserService;
import com.clms.util.SecurityUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.validation.Valid;
import java.util.UUID;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Student", description = "Student profile and learning APIs")
public class StudentController {
    private final UserService userService;
    private final ProgressService progressService;
    private final CourseService courseService;
    private final CertificateService certificateService;

    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<UserDto>> getProfile() {
        return ResponseEntity.ok(ApiResponse.success(userService.getCurrentUser()));
    }

    @PutMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<UserDto>> updateProfile(@Valid @RequestBody UpdateProfileRequest request) {
        return ResponseEntity.ok(ApiResponse.success(userService.updateProfile(request, SecurityUtils.getCurrentUserId())));
    }

    @GetMapping("/dashboard")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<DashboardDto>> getDashboard() {
        return ResponseEntity.ok(ApiResponse.success(progressService.getDashboard(SecurityUtils.getCurrentUserId())));
    }

    @GetMapping("/enrollments")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<?>> getEnrollments() {
        return ResponseEntity.ok(ApiResponse.success(courseService.getStudentEnrollments(SecurityUtils.getCurrentUserId())));
    }

    @GetMapping("/certificates")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<?>> getCertificates() {
        return ResponseEntity.ok(ApiResponse.success(certificateService.getStudentCertificates(SecurityUtils.getCurrentUserId())));
    }

    @GetMapping("/progress/{courseId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<?>> getCourseProgress(@PathVariable UUID courseId) {
        return ResponseEntity.ok(ApiResponse.success(progressService.getCourseProgress(courseId, SecurityUtils.getCurrentUserId())));
    }
    
    @PostMapping("/avatar")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<String>> uploadAvatar(@RequestParam("file") MultipartFile file) {
        String url = userService.uploadAvatar(file, SecurityUtils.getCurrentUserId());
        return ResponseEntity.ok(ApiResponse.success("Avatar updated", url));
    }
}
