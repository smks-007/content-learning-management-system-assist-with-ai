package com.clms.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "ai_logs")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class AiLog extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    private String endpoint;
    private Integer promptTokens;
    private Integer completionTokens;
    private Integer totalTokens;
    private String model;
    private Long latencyMs;
    
    @Builder.Default
    private Boolean isSuccess = true;
    
    @Column(columnDefinition = "TEXT")
    private String errorMessage;
}
