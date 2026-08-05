package com.clms.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "courses")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Course extends BaseEntity {
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(length = 500)
    private String shortDescription;
    
    private String thumbnail;
    
    private BigDecimal price;
    private BigDecimal discountPrice;
    
    @Enumerated(EnumType.STRING)
    private CourseLevel level;
    
    @Enumerated(EnumType.STRING)
    private CourseStatus status;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id")
    private Instructor instructor;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
    
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Lesson> lessons = new ArrayList<>();
    
    @OneToMany(mappedBy = "course")
    @Builder.Default
    private List<Enrollment> enrollments = new ArrayList<>();
    
    @ElementCollection
    @CollectionTable(name = "course_tags", joinColumns = @JoinColumn(name = "course_id"))
    @Column(name = "tag")
    @Builder.Default
    private List<String> tags = new ArrayList<>();
    
    @Builder.Default
    private Integer totalDuration = 0; // in minutes
    
    @Builder.Default
    private Integer totalLessons = 0;
    
    @Builder.Default
    private Double rating = 0.0;
    
    @Builder.Default
    private Integer totalRatings = 0;
    
    @Builder.Default
    private Boolean isFeatured = false;
    
    private String language;
    
    @ElementCollection
    @CollectionTable(name = "course_requirements", joinColumns = @JoinColumn(name = "course_id"))
    @Column(name = "requirement")
    @Builder.Default
    private List<String> requirements = new ArrayList<>();
    
    @ElementCollection
    @CollectionTable(name = "course_objectives", joinColumns = @JoinColumn(name = "course_id"))
    @Column(name = "objective")
    @Builder.Default
    private List<String> objectives = new ArrayList<>();
    
    public enum CourseLevel {
        BEGINNER, INTERMEDIATE, ADVANCED
    }
    
    public enum CourseStatus {
        DRAFT, PUBLISHED, ARCHIVED
    }
}
