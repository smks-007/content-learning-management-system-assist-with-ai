package com.clms.repository;

import com.clms.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface QuizRepository extends JpaRepository<Quiz, UUID> {
    List<Quiz> findByCourseIdAndDeletedAtIsNull(UUID courseId);
    List<Quiz> findByCourseIdAndIsPublishedTrueAndDeletedAtIsNull(UUID courseId);
    long countByDeletedAtIsNull();
}
