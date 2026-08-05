package com.clms.controller;

import com.clms.dto.request.PaymentCreateRequest;
import com.clms.dto.response.ApiResponse;
import com.clms.dto.response.PaymentDto;
import com.clms.dto.response.PaymentIntentResponse;
import com.clms.service.PaymentService;
import com.clms.util.SecurityUtils;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
@Tag(name = "Payment", description = "Payment APIs")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<PaymentIntentResponse>> createPaymentIntent(@Valid @RequestBody PaymentCreateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(paymentService.createPaymentIntent(request, SecurityUtils.getCurrentUserId())));
    }

    @PostMapping("/webhook")
    public ResponseEntity<Void> handleWebhook(@RequestBody String payload) {
        paymentService.handleWebhook(payload);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/history")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<List<PaymentDto>>> getPaymentHistory() {
        return ResponseEntity.ok(ApiResponse.success(paymentService.getPaymentHistory(SecurityUtils.getCurrentUserId())));
    }
}
