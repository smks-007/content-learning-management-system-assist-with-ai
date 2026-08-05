package com.clms.repository;

import com.clms.entity.Course;
import com.clms.entity.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CourseRepository extends JpaRepository<Course, UUID> {
    List<Course> findByStatusAndCategory_Id(Course.CourseStatus status, UUID categoryId);
    List<Course> findByTitleContainingIgnoreCase(String title);
    List<Course> findByIsFeaturedTrue();
    List<Course> findByInstructor(Instructor instructor);
}
