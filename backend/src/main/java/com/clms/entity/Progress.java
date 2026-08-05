package com.clms.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Table(name = "progress")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Progress extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;
    
    @Builder.Default
    private Boolean isCompleted = false;
    
    private LocalDateTime completedAt;
    
    @Builder.Default
    private Integer watchedDuration = 0; // for video lessons, in seconds
    
    private LocalDateTime lastWatchedAt;

    public Boolean isCompleted() {
        return Boolean.TRUE.equals(isCompleted);
    }
    public void setCompleted(Boolean completed) {
        this.isCompleted = completed;
    }
}
