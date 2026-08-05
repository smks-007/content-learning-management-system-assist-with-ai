package com.clms.controller;

import com.clms.dto.request.CreateCourseRequest;
import com.clms.dto.response.ApiResponse;
import com.clms.dto.response.CourseDto;
import com.clms.service.CourseService;
import com.clms.service.LessonService;
import com.clms.util.SecurityUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
@Tag(name = "Course", description = "Course APIs")
public class CourseController {

    private final CourseService courseService;
    private final LessonService lessonService;

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllCourses(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok(ApiResponse.success(courseService.getAllCourses(params)));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<?>> getFeaturedCourses() {
        return ResponseEntity.ok(ApiResponse.success(courseService.getFeaturedCourses()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> getCourseById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(courseService.getCourseById(id, SecurityUtils.getCurrentUserId())));
    }

    @PostMapping
    @PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> createCourse(@Valid @RequestBody CreateCourseRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(courseService.createCourse(request, SecurityUtils.getCurrentUserId())));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> updateCourse(@PathVariable UUID id, @Valid @RequestBody CreateCourseRequest request) {
        return ResponseEntity.ok(ApiResponse.success(courseService.updateCourse(id, request, SecurityUtils.getCurrentUserId())));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteCourse(@PathVariable UUID id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @PostMapping("/{id}/enroll")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Void>> enrollInCourse(@PathVariable UUID id) {
        courseService.enrollInCourse(id, SecurityUtils.getCurrentUserId());
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @GetMapping("/{id}/lessons")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<?>> getCourseLessons(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(lessonService.getLessonsByCourse(id, SecurityUtils.getCurrentUserId())));
    }
}
