package com.clms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class DashboardDto {
    private int enrolledCourses;
    private int completedCourses;
    private int completedLessons;
    private int totalQuizAttempts;
    private int passedQuizzes;
    private int totalCertificates;
    private double overallProgress;
    private double weeklyStudyHours;
    private int aiChatCount;
    private List<EnrollmentDto> recentEnrollments;
    private List<CertificateDto> recentCertificates;

    public void setActiveCourses(int activeCourses) {
        this.enrolledCourses = activeCourses;
    }
}
