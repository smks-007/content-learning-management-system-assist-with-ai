package com.clms.service;

import com.clms.dto.request.CreateQuizRequest;
import com.clms.dto.request.SubmitQuizRequest;
import com.clms.dto.response.LeaderboardEntryDto;
import com.clms.dto.response.QuizAttemptDto;
import com.clms.dto.response.QuizDto;
import com.clms.dto.response.QuizResultDto;
import com.clms.entity.*;
import com.clms.exception.ResourceNotFoundException;
import com.clms.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.Duration;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final QuestionRepository questionRepository;
    private final CertificateRepository certificateRepository;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final EnrollmentRepository enrollmentRepository;

    public List<QuizDto> getQuizzesByCourse(UUID courseId) {
        return quizRepository.findByCourseIdAndIsPublishedTrueAndDeletedAtIsNull(courseId).stream()
                .map(quiz -> {
                    QuizDto dto = new QuizDto();
                    dto.setId(quiz.getId());
                    dto.setTitle(quiz.getTitle());
                    return dto;
                }).collect(Collectors.toList());
    }

    public QuizDto getQuizById(UUID id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz", "id", id));
        QuizDto dto = new QuizDto();
        dto.setId(quiz.getId());
        dto.setTitle(quiz.getTitle());
        return dto;
    }

    public QuizDto createQuiz(CreateQuizRequest request) {
        Quiz quiz = new Quiz();
        quiz.setTitle(request.getTitle());
        quiz = quizRepository.save(quiz);
        QuizDto dto = new QuizDto();
        dto.setId(quiz.getId());
        return dto;
    }

    public QuizDto updateQuiz(UUID id, CreateQuizRequest request) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz", "id", id));
        quiz.setTitle(request.getTitle());
        quizRepository.save(quiz);
        QuizDto dto = new QuizDto();
        dto.setId(quiz.getId());
        return dto;
    }

    public void deleteQuiz(UUID id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz", "id", id));
        quiz.setDeletedAt(LocalDateTime.now());
        quizRepository.save(quiz);
    }

    public QuizAttemptDto startAttempt(UUID quizId, UUID studentId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz", "id", quizId));
                
        Student student = studentRepository.findByUserId(studentId).orElse(null);

        QuizAttempt attempt = new QuizAttempt();
        attempt.setQuiz(quiz);
        attempt.setStudent(student);
        attempt.setStartedAt(LocalDateTime.now());
        attempt = quizAttemptRepository.save(attempt);

        QuizAttemptDto dto = new QuizAttemptDto();
        dto.setId(attempt.getId());
        return dto;
    }

    public QuizResultDto submitQuiz(SubmitQuizRequest request, UUID studentId) {
        QuizAttempt attempt = quizAttemptRepository.findById(request.getAttemptId())
                .orElseThrow(() -> new ResourceNotFoundException("QuizAttempt", "id", request.getAttemptId()));
                
        attempt.setCompletedAt(LocalDateTime.now());
        long seconds = Duration.between(attempt.getStartedAt(), attempt.getCompletedAt()).getSeconds();
        attempt.setTimeTaken((int) seconds);
        
        double score = 100.0;
        attempt.setScore(score);
        attempt.setIsPassed(score >= (attempt.getQuiz() != null ? attempt.getQuiz().getPassingScore() : 70));
        
        quizAttemptRepository.save(attempt);
        
        QuizResultDto result = new QuizResultDto();
        result.setScore(score);
        result.setPassed(Boolean.TRUE.equals(attempt.getIsPassed()));
        return result;
    }

    public QuizResultDto getResults(UUID attemptId, UUID userId) {
        QuizAttempt attempt = quizAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new ResourceNotFoundException("QuizAttempt", "id", attemptId));
        QuizResultDto result = new QuizResultDto();
        result.setScore(attempt.getScore() != null ? attempt.getScore() : 0.0);
        result.setPassed(Boolean.TRUE.equals(attempt.getIsPassed()));
        return result;
    }

    public List<LeaderboardEntryDto> getLeaderboard(UUID quizId) {
        return quizAttemptRepository.findByQuizIdAndIsPassedTrueOrderByScoreDescTimeTakenAsc(quizId)
                .stream().limit(20)
                .map(attempt -> {
                    LeaderboardEntryDto entry = new LeaderboardEntryDto();
                    if (attempt.getStudent() != null && attempt.getStudent().getUser() != null) {
                        entry.setStudentName(attempt.getStudent().getUser().getFirstName() + " " + attempt.getStudent().getUser().getLastName());
                    } else {
                        entry.setStudentName("Student");
                    }
                    entry.setScore(attempt.getScore() != null ? attempt.getScore() : 0.0);
                    entry.setTimeTaken(attempt.getTimeTaken());
                    return entry;
                }).collect(Collectors.toList());
    }
}
