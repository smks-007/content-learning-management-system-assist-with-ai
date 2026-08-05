package com.clms.controller;

import com.clms.dto.response.ApiResponse;
import com.clms.dto.response.CertificateDto;
import com.clms.service.CertificateService;
import com.clms.util.SecurityUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/certificates")
@RequiredArgsConstructor
@Tag(name = "Certificate", description = "Certificate APIs")
public class CertificateController {

    private final CertificateService certificateService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<List<CertificateDto>>> getStudentCertificates() {
        return ResponseEntity.ok(ApiResponse.success(certificateService.getStudentCertificates(SecurityUtils.getCurrentUserId())));
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<CertificateDto>> getCertificateById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(certificateService.getCertificateById(id)));
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<String> downloadCertificate(@PathVariable UUID id) {
        String html = certificateService.generateCertificateHtml(id);
        return ResponseEntity.ok()
                .contentType(MediaType.TEXT_HTML)
                .body(html);
    }

    @GetMapping("/verify/{code}")
    public ResponseEntity<ApiResponse<CertificateDto>> verifyCertificate(@PathVariable String code) {
        return ResponseEntity.ok(ApiResponse.success(certificateService.verifyCertificate(code)));
    }
}
