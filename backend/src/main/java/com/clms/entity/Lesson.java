package com.clms.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "lessons")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Lesson extends BaseEntity {
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    public String getDescription() {
        return content;
    }
    public void setDescription(String description) {
        this.content = description;
    }
    
    private Integer orderIndex;
    
    @Builder.Default
    private Integer duration = 0; // in minutes
    
    @Enumerated(EnumType.STRING)
    private LessonType lessonType;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;
    
    private String videoUrl;
    private String pdfUrl;
    
    @Builder.Default
    private Boolean isPreview = false;
    
    @ElementCollection
    @CollectionTable(name = "lesson_resources", joinColumns = @JoinColumn(name = "lesson_id"))
    @Column(name = "resource_url")
    @Builder.Default
    private List<String> resources = new ArrayList<>();
    
    public enum LessonType {
        VIDEO, PDF, TEXT, QUIZ
    }
}
