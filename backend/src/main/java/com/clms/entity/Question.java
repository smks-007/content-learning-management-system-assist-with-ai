package com.clms.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "questions")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Question extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String questionText;
    
    @Enumerated(EnumType.STRING)
    private QuestionType questionType;
    
    private Integer orderIndex;
    
    @Builder.Default
    private Double points = 1.0;
    
    @Column(columnDefinition = "TEXT")
    private String explanation;
    
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    @Builder.Default
    private List<QuizOption> options = new ArrayList<>();
    
    @Column(columnDefinition = "TEXT")
    private String correctAnswer; // used for fill-in-blank or coding
    
    public enum QuestionType {
        MCQ, FILL_BLANK, CODING
    }
}
