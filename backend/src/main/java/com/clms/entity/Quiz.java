package com.clms.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "quizzes")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Quiz extends BaseEntity {
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;
    
    private Integer timeLimit; // in minutes
    private Double passingScore; // percentage
    
    @Builder.Default
    private Integer maxAttempts = 1;
    
    @Builder.Default
    private Boolean isPublished = false;
    
    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Question> questions = new ArrayList<>();
}
