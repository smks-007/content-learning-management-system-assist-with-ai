package com.clms.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class PaymentCreateRequest {
    @NotNull private UUID courseId;
    private String currency = "USD";
}
