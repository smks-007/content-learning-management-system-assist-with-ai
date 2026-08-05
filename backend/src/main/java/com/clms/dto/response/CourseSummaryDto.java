package com.clms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class CourseSummaryDto {
    private UUID id;
    private String title;
    private String shortDescription;
    private String thumbnail;
    private BigDecimal price;
    private BigDecimal discountPrice;
    private String level;
    private String status;
    private double rating;
    private int totalRatings;
    private int totalLessons;
    private int totalDuration;
    private String instructorName;
    private String instructorAvatar;
    private UUID categoryId;
    private String categoryName;
    private boolean isEnrolled;
    private boolean isFeatured;
}
