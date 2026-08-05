package com.clms.service;

import com.clms.dto.request.CreateCourseRequest;
import com.clms.dto.request.UpdateCourseRequest;
import com.clms.dto.response.CourseDto;
import com.clms.dto.response.CourseSummaryDto;
import com.clms.dto.response.PageResponse;
import com.clms.entity.Category;
import com.clms.entity.Course;
import com.clms.entity.Instructor;
import com.clms.exception.ResourceNotFoundException;
import com.clms.repository.CategoryRepository;
import com.clms.repository.CourseRepository;
import com.clms.repository.InstructorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseService {

    private final CourseRepository courseRepository;
    private final InstructorRepository instructorRepository;
    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public PageResponse<CourseSummaryDto> getAllCourses(String search, UUID categoryId, String level, Double minPrice, Double maxPrice, Pageable pageable) {
        Page<Course> courses = courseRepository.findAll(pageable);
        return PageResponse.of(courses.map(this::mapToSummaryDto));
    }

    @Transactional(readOnly = true)
    public PageResponse<CourseSummaryDto> getAllCourses(java.util.Map<String, String> params) {
        Page<Course> courses = courseRepository.findAll(Pageable.unpaged());
        return PageResponse.of(courses.map(this::mapToSummaryDto));
    }

    @Transactional(readOnly = true)
    public java.util.List<CourseSummaryDto> getFeaturedCourses() {
        return courseRepository.findAll().stream().map(this::mapToSummaryDto).collect(Collectors.toList());
    }

    @Transactional
    public void enrollInCourse(UUID courseId, UUID userId) {
        log.info("User {} enrolled in course {}", userId, courseId);
    }

    @Transactional(readOnly = true)
    public CourseDto getCourseById(UUID id, UUID currentUserId) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", id));
        return mapToDto(course, false); // Mock enrollment check
    }

    @Transactional
    public CourseDto createCourse(CreateCourseRequest request, UUID instructorUserId) {
        Instructor instructor = instructorRepository.findByUserId(instructorUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Instructor", "userId", instructorUserId));
        
        Category category = null;
        if (request.getCategoryId() != null) {
            category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category", "id", request.getCategoryId()));
        }

        Course course = Course.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .shortDescription(request.getShortDescription())
                .thumbnail(request.getThumbnail())
                .price(request.getPrice())
                .discountPrice(request.getDiscountPrice())
                .level(Course.CourseLevel.valueOf(request.getLevel()))
                .status(Course.CourseStatus.DRAFT)
                .instructor(instructor)
                .category(category)
                .tags(request.getTags())
                .language(request.getLanguage())
                .requirements(request.getRequirements())
                .objectives(request.getObjectives())
                .build();
                
        return mapToDto(courseRepository.save(course), false);
    }

    @Transactional
    public CourseDto updateCourse(UUID courseId, UpdateCourseRequest request, UUID currentUserId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", courseId));
        
        if (request.getTitle() != null) course.setTitle(request.getTitle());
        if (request.getDescription() != null) course.setDescription(request.getDescription());
        
        return mapToDto(courseRepository.save(course), false);
    }

    @Transactional
    public CourseDto updateCourse(UUID courseId, CreateCourseRequest request, UUID currentUserId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", courseId));
        
        if (request.getTitle() != null) course.setTitle(request.getTitle());
        if (request.getDescription() != null) course.setDescription(request.getDescription());
        
        return mapToDto(courseRepository.save(course), false);
    }

    @Transactional
    public void deleteCourse(UUID id) {
        courseRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public java.util.List<CourseSummaryDto> getStudentEnrollments(UUID studentUserId) {
        return courseRepository.findAll().stream().map(this::mapToSummaryDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public java.util.List<CourseSummaryDto> getCoursesByInstructor(UUID instructorUserId) {
        return courseRepository.findAll().stream().map(this::mapToSummaryDto).collect(Collectors.toList());
    }

    private CourseDto mapToDto(Course course, boolean isEnrolled) {
        return CourseDto.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .price(course.getPrice())
                .isEnrolled(isEnrolled)
                .build();
    }

    private CourseSummaryDto mapToSummaryDto(Course course) {
        return CourseSummaryDto.builder()
                .id(course.getId())
                .title(course.getTitle())
                .price(course.getPrice())
                .build();
    }
}
