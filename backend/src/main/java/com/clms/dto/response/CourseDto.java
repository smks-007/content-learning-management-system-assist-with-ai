package com.clms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class CourseDto {
    private UUID id;
    private String title;
    private String description;
    private String shortDescription;
    private String thumbnail;
    private BigDecimal price;
    private BigDecimal discountPrice;
    private String level;
    private String status;
    private String language;
    private int totalDuration;
    private int totalLessons;
    private double rating;
    private int totalRatings;
    private boolean isFeatured;
    private UUID instructorId;
    private String instructorName;
    private String instructorAvatar;
    private UUID categoryId;
    private String categoryName;
    private List<String> tags;
    private List<String> requirements;
    private List<String> objectives;
    private boolean isEnrolled;
    private int enrollmentCount;
    private LocalDateTime createdAt;
}
