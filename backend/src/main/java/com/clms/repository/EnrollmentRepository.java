package com.clms.repository;

import com.clms.entity.Enrollment;
import com.clms.entity.Student;
import com.clms.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, UUID> {
    Optional<Enrollment> findByStudentAndCourse(Student student, Course course);
    List<Enrollment> findByStudent(Student student);
    List<Enrollment> findByStudentId(UUID studentId);
    Optional<Enrollment> findByStudentIdAndCourseId(UUID studentId, UUID courseId);
    boolean existsByStudentAndCourse(Student student, Course course);
}
