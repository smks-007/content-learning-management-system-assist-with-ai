package com.clms.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_attempts")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class QuizAttempt extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;
    
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    
    private Double score;
    private Boolean isPassed;
    
    @Column(columnDefinition = "TEXT")
    private String answers; // JSON string of submitted answers
    
    private Integer timeTaken; // in seconds
}
