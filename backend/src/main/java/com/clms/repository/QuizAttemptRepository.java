package com.clms.repository;

import com.clms.entity.QuizAttempt;
import com.clms.entity.Student;
import com.clms.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, UUID> {
    List<QuizAttempt> findByStudentAndQuiz(Student student, Quiz quiz);
    long countByStudentAndQuizAndIsPassedTrue(Student student, Quiz quiz);
    List<QuizAttempt> findByQuizIdAndIsPassedTrueOrderByScoreDescTimeTakenAsc(UUID quizId);
}
