package com.clms.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data @Builder
public class InstructorDto {
    private UUID id;
    private UUID userId;
    private String firstName;
    private String lastName;
    private String email;
    private String avatar;
    private String bio;
    private String expertise;
    private double rating;
    private int totalStudents;
    private int totalCourses;
}
