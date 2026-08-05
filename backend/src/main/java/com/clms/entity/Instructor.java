package com.clms.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "instructors")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Instructor extends BaseEntity {
    
    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;
    
    @Column(columnDefinition = "TEXT")
    private String bio;
    
    private String expertise;
    
    @Builder.Default
    private Double rating = 0.0;
    
    @Builder.Default
    private Integer totalStudents = 0;
    
    @OneToMany(mappedBy = "instructor")
    @Builder.Default
    private List<Course> courses = new ArrayList<>();
}
