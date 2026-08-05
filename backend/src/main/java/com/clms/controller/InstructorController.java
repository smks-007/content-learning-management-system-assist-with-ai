package com.clms.controller;

import com.clms.dto.response.ApiResponse;
import com.clms.dto.response.CourseSummaryDto;
import com.clms.dto.response.UserDto;
import com.clms.service.CourseService;
import com.clms.service.UserService;
import com.clms.util.SecurityUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/instructor")
@RequiredArgsConstructor
@PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
@Tag(name = "Instructor", description = "Instructor APIs")
public class InstructorController {

    private final UserService userService;
    private final CourseService courseService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserDto>> getProfile() {
        return ResponseEntity.ok(ApiResponse.success(userService.getCurrentUser()));
    }

    @GetMapping("/courses")
    public ResponseEntity<ApiResponse<List<CourseSummaryDto>>> getCourses() {
        return ResponseEntity.ok(ApiResponse.success(courseService.getCoursesByInstructor(SecurityUtils.getCurrentUserId())));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboard() {
        return ResponseEntity.ok(ApiResponse.success(Map.of("stats", "Mock Stats")));
    }
}
