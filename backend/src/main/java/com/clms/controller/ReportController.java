package com.clms.controller;

import com.clms.dto.response.ApiResponse;
import com.clms.dto.response.ReportDto;
import com.clms.service.ReportService;
import com.clms.util.SecurityUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@Tag(name = "Report", description = "Report APIs")
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/student")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<ReportDto>> getStudentReport() {
        return ResponseEntity.ok(ApiResponse.success(reportService.getStudentReport(SecurityUtils.getCurrentUserId())));
    }

    @GetMapping("/student/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")
    public ResponseEntity<ApiResponse<ReportDto>> getStudentReportById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(reportService.getStudentReport(id)));
    }

    @GetMapping("/course/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")
    public ResponseEntity<ApiResponse<ReportDto>> getCourseReport(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(reportService.getCourseReport(id)));
    }

    @GetMapping("/quiz/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")
    public ResponseEntity<ApiResponse<ReportDto>> getQuizReport(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(reportService.getQuizReport(id)));
    }

    @PostMapping("/pdf")
    public ResponseEntity<byte[]> generatePdf(@RequestBody Map<String, String> body) {
        byte[] pdfBytes = new byte[0];
        return ResponseEntity.ok()
                .contentType(MediaType.TEXT_HTML)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"report.html\"")
                .body(pdfBytes);
    }
}
