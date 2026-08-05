package com.clms.service;

import com.clms.dto.response.DashboardDto;
import com.clms.dto.response.ProgressDto;
import com.clms.entity.Progress;
import com.clms.repository.CertificateRepository;
import com.clms.repository.EnrollmentRepository;
import com.clms.repository.LessonRepository;
import com.clms.repository.ProgressRepository;
import com.clms.repository.QuizAttemptRepository;
import com.clms.repository.ChatHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProgressService {
    private final EnrollmentRepository enrollmentRepository;
    private final ProgressRepository progressRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final CertificateRepository certificateRepository;
    private final LessonRepository lessonRepository;
    private final ChatHistoryRepository chatHistoryRepository;
    
    public DashboardDto getDashboard(UUID userId) {
        int activeCourses = (int) enrollmentRepository.findByStudentId(userId).stream()
                .filter(e -> "ACTIVE".equals(e.getStatus()))
                .count();
        int completedCourses = (int) enrollmentRepository.findByStudentId(userId).stream()
                .filter(e -> "COMPLETED".equals(e.getStatus()))
                .count();
        int totalCertificates = (int) certificateRepository.countByStudentId(userId);
        
        DashboardDto dto = new DashboardDto();
        dto.setActiveCourses(activeCourses);
        dto.setCompletedCourses(completedCourses);
        dto.setTotalCertificates(totalCertificates);
        return dto;
    }
    
    public List<ProgressDto> getCourseProgress(UUID courseId, UUID studentId) {
        return progressRepository.findByStudentIdAndLesson_CourseId(studentId, courseId).stream()
                .map(p -> {
                    ProgressDto dto = new ProgressDto();
                    dto.setId(p.getId());
                    dto.setCompleted(p.isCompleted());
                    return dto;
                }).collect(Collectors.toList());
    }
}
