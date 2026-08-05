package com.clms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class AdminDashboardDto {
    private long totalUsers;
    private long totalStudents;
    private long totalInstructors;
    private long totalCourses;
    private long publishedCourses;
    private long totalQuizzes;
    private BigDecimal totalRevenue;
    private long totalAiRequests;
    private long newUsersThisMonth;
    private long activeEnrollments;
}
