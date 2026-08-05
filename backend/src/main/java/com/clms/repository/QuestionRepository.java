package com.clms.repository;

import com.clms.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface QuestionRepository extends JpaRepository<Question, UUID> {
    List<Question> findByQuizIdOrderByOrderIndexAsc(UUID quizId);
    int countByQuizId(UUID quizId);
}
