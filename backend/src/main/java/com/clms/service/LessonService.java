package com.clms.service;

import com.clms.dto.request.CreateLessonRequest;
import com.clms.dto.response.LessonDto;
import com.clms.dto.response.ProgressDto;
import com.clms.entity.Course;
import com.clms.entity.Lesson;
import com.clms.entity.Progress;
import com.clms.exception.ResourceNotFoundException;
import com.clms.repository.CourseRepository;
import com.clms.repository.EnrollmentRepository;
import com.clms.repository.LessonRepository;
import com.clms.repository.ProgressRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class LessonService {

    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;
    private final ProgressRepository progressRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final FileStorageService fileStorageService;
    private final com.clms.repository.StudentRepository studentRepository;

    public List<LessonDto> getLessonsByCourse(UUID courseId, UUID currentUserId) {
        return lessonRepository.findByCourseIdAndDeletedAtIsNullOrderByOrderIndexAsc(courseId)
                .stream()
                .map(lesson -> {
                    LessonDto dto = new LessonDto();
                    // map basics
                    dto.setId(lesson.getId());
                    dto.setTitle(lesson.getTitle());
                    dto.setDescription(lesson.getDescription());
                    dto.setVideoUrl(lesson.getVideoUrl());
                    dto.setPdfUrl(lesson.getPdfUrl());
                    dto.setDuration(lesson.getDuration());
                    dto.setOrderIndex(lesson.getOrderIndex());

                    if (currentUserId != null) {
                        progressRepository.findByStudentIdAndLessonId(currentUserId, lesson.getId())
                                .ifPresent(p -> {
                                    dto.setCompleted(p.isCompleted());
                                    dto.setWatchedDuration(p.getWatchedDuration());
                                });
                    }
                    return dto;
                }).collect(Collectors.toList());
    }

    public LessonDto getLessonById(UUID id, UUID currentUserId) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
        
        LessonDto dto = new LessonDto();
        dto.setId(lesson.getId());
        dto.setTitle(lesson.getTitle());
        dto.setDescription(lesson.getDescription());
        dto.setVideoUrl(lesson.getVideoUrl());
        dto.setPdfUrl(lesson.getPdfUrl());
        dto.setDuration(lesson.getDuration());
        dto.setOrderIndex(lesson.getOrderIndex());

        if (currentUserId != null) {
            progressRepository.findByStudentIdAndLessonId(currentUserId, lesson.getId())
                    .ifPresent(p -> {
                        dto.setCompleted(p.isCompleted());
                        dto.setWatchedDuration(p.getWatchedDuration());
                    });
        }
        return dto;
    }

    public LessonDto createLesson(CreateLessonRequest request, UUID instructorUserId) {
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", request.getCourseId()));
        
        Lesson lesson = new Lesson();
        lesson.setCourse(course);
        lesson.setTitle(request.getTitle());
        lesson.setDescription(request.getDescription());
        lesson.setDuration(request.getDuration());
        lesson.setOrderIndex(request.getOrderIndex());
        
        lesson = lessonRepository.save(lesson);
        
        course.setTotalLessons(course.getTotalLessons() + 1);
        courseRepository.save(course);
        
        LessonDto dto = new LessonDto();
        dto.setId(lesson.getId());
        dto.setTitle(lesson.getTitle());
        return dto;
    }

    public LessonDto updateLesson(UUID id, CreateLessonRequest request) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
        lesson.setTitle(request.getTitle());
        lesson.setDescription(request.getDescription());
        lesson.setDuration(request.getDuration());
        lesson.setOrderIndex(request.getOrderIndex());
        lessonRepository.save(lesson);
        
        LessonDto dto = new LessonDto();
        dto.setId(lesson.getId());
        return dto;
    }

    public void deleteLesson(UUID id) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", id));
        lesson.setDeletedAt(LocalDateTime.now());
        lessonRepository.save(lesson);
    }

    public ProgressDto updateProgress(UUID lessonId, UUID studentId, int watchedDuration) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", lessonId));
                
        Progress progress = progressRepository.findByStudentIdAndLessonId(studentId, lessonId)
                .orElse(new Progress());
                
        com.clms.entity.Student student = studentRepository.findByUserId(studentId).orElse(null);
        progress.setStudent(student);
        progress.setLesson(lesson);
        progress.setWatchedDuration(watchedDuration);
        
        if (lesson.getDuration() == 0 || watchedDuration >= lesson.getDuration() * 0.9) {
            progress.setCompleted(true);
        }
        
        progress = progressRepository.save(progress);
        
        // Update enrollment progress
        enrollmentRepository.findByStudentIdAndCourseId(studentId, lesson.getCourse().getId())
                .ifPresent(enrollment -> {
                    int completed = progressRepository.countByStudentIdAndLesson_CourseIdAndIsCompletedTrue(studentId, lesson.getCourse().getId());
                    int total = lesson.getCourse().getTotalLessons();
                    if (total > 0) {
                        enrollment.setProgress((double) (completed * 100) / total);
                        enrollmentRepository.save(enrollment);
                    }
                });
                
        ProgressDto dto = new ProgressDto();
        dto.setId(progress.getId());
        dto.setCompleted(progress.isCompleted());
        return dto;
    }

    public void uploadVideo(UUID lessonId, MultipartFile file, UUID userId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", lessonId));
        String url = fileStorageService.storeFile(file, "videos");
        lesson.setVideoUrl(url);
        lessonRepository.save(lesson);
    }

    public void uploadPdf(UUID lessonId, MultipartFile file, UUID userId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", lessonId));
        String url = fileStorageService.storeFile(file, "pdfs");
        lesson.setPdfUrl(url);
        lessonRepository.save(lesson);
    }
}
