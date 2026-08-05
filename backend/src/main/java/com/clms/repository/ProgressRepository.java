package com.clms.repository;

import com.clms.entity.Progress;
import com.clms.entity.Student;
import com.clms.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, UUID> {
    Optional<Progress> findByStudentAndLesson(Student student, Lesson lesson);
    List<Progress> findByStudentAndLesson_Course_Id(Student student, UUID courseId);
    List<Progress> findByStudentIdAndLesson_CourseId(UUID studentId, UUID courseId);
    Optional<Progress> findByStudentIdAndLessonId(UUID studentId, UUID lessonId);
    int countByStudentIdAndLesson_CourseIdAndIsCompletedTrue(UUID studentId, UUID courseId);
}
