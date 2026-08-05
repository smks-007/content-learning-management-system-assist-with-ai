package com.clms.repository;

import com.clms.entity.Discussion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DiscussionRepository extends JpaRepository<Discussion, UUID> {
    Page<Discussion> findByCourseIdAndDeletedAtIsNull(UUID courseId, Pageable pageable);
    Page<Discussion> findByCourseIdAndDeletedAtIsNullOrderByCreatedAtDesc(UUID courseId, Pageable pageable);
    Page<Discussion> findByLessonIdAndDeletedAtIsNull(UUID lessonId, Pageable pageable);
}
