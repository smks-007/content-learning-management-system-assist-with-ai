package com.clms.service;

import com.clms.dto.response.ReportDto;
import com.clms.repository.CertificateRepository;
import com.clms.repository.CourseRepository;
import com.clms.repository.EnrollmentRepository;
import com.clms.repository.ProgressRepository;
import com.clms.repository.QuizAttemptRepository;
import com.clms.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReportService {
    private final EnrollmentRepository enrollmentRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final CertificateRepository certificateRepository;
    private final ProgressRepository progressRepository;
    private final CourseRepository courseRepository;
    private final QuizRepository quizRepository;

    public ReportDto getStudentReport(UUID studentId) {
        ReportDto report = new ReportDto();
        return report;
    }

    public ReportDto getCourseReport(UUID courseId) {
        ReportDto report = new ReportDto();
        return report;
    }

    public ReportDto getQuizReport(UUID quizId) {
        ReportDto report = new ReportDto();
        return report;
    }
}
