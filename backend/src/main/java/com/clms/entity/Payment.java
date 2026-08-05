package com.clms.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Payment extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;
    
    private BigDecimal amount;
    private String currency;
    
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;
    
    private String stripePaymentIntentId;
    private String stripeSessionId;
    
    private LocalDateTime paidAt;
    private LocalDateTime refundedAt;
    
    public enum PaymentStatus {
        PENDING, SUCCESS, FAILED, REFUNDED
    }
}
