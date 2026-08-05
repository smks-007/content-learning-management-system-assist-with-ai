package com.clms.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Table(name = "submissions")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Submission extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_id")
    private Assignment assignment;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;
    
    private LocalDateTime submittedAt;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    private String fileUrl;
    
    private Double score;
    
    @Column(columnDefinition = "TEXT")
    private String feedback;
    
    @Enumerated(EnumType.STRING)
    private SubmissionStatus status;
    
    public enum SubmissionStatus {
        SUBMITTED, GRADED, RETURNED
    }
}
