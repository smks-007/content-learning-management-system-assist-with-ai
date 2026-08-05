package com.clms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class PaymentDto {
    private UUID id;
    private UUID courseId;
    private String courseName;
    private BigDecimal amount;
    private String currency;
    private String status;
    private String stripePaymentIntentId;
    private LocalDateTime paidAt;
    private LocalDateTime createdAt;
}
