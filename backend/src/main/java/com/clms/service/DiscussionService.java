package com.clms.service;

import com.clms.dto.request.CreateDiscussionRequest;
import com.clms.dto.response.CommentDto;
import com.clms.dto.response.DiscussionDto;
import com.clms.entity.Discussion;
import com.clms.entity.Comment;
import com.clms.entity.Course;
import com.clms.entity.User;
import com.clms.exception.ResourceNotFoundException;
import com.clms.repository.DiscussionRepository;
import com.clms.repository.CommentRepository;
import com.clms.repository.CourseRepository;
import com.clms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class DiscussionService {
    private final DiscussionRepository discussionRepository;
    private final CommentRepository commentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public Page<DiscussionDto> getDiscussionsByCourse(UUID courseId, Pageable pageable) {
        return discussionRepository.findByCourseIdAndDeletedAtIsNullOrderByCreatedAtDesc(courseId, pageable)
                .map(d -> {
                    DiscussionDto dto = new DiscussionDto();
                    dto.setId(d.getId());
                    dto.setTitle(d.getTitle());
                    return dto;
                });
    }

    public DiscussionDto createDiscussion(CreateDiscussionRequest request, UUID authorId) {
        User author = userRepository.findById(authorId).orElseThrow();
        Course course = courseRepository.findById(request.getCourseId()).orElseThrow();
        Discussion d = new Discussion();
        d.setAuthor(author);
        d.setCourse(course);
        d.setTitle(request.getTitle());
        d = discussionRepository.save(d);
        DiscussionDto dto = new DiscussionDto();
        dto.setId(d.getId());
        return dto;
    }

    public DiscussionDto getDiscussionById(UUID id) {
        Discussion d = discussionRepository.findById(id).orElseThrow();
        DiscussionDto dto = new DiscussionDto();
        dto.setId(d.getId());
        dto.setTitle(d.getTitle());
        return dto;
    }

    public DiscussionDto updateDiscussion(UUID id, CreateDiscussionRequest request, UUID userId) {
        Discussion d = discussionRepository.findById(id).orElseThrow();
        d.setTitle(request.getTitle());
        discussionRepository.save(d);
        DiscussionDto dto = new DiscussionDto();
        dto.setId(d.getId());
        return dto;
    }

    public void deleteDiscussion(UUID id, UUID userId) {
        Discussion d = discussionRepository.findById(id).orElseThrow();
        d.setDeletedAt(LocalDateTime.now());
        discussionRepository.save(d);
    }

    public CommentDto addComment(UUID discussionId, String content, UUID authorId) {
        Discussion d = discussionRepository.findById(discussionId).orElseThrow();
        User author = userRepository.findById(authorId).orElseThrow();
        Comment c = new Comment();
        c.setDiscussion(d);
        c.setAuthor(author);
        c.setContent(content);
        c = commentRepository.save(c);
        CommentDto dto = new CommentDto();
        dto.setId(c.getId());
        return dto;
    }

    public List<CommentDto> getComments(UUID discussionId) {
        return commentRepository.findByDiscussionIdAndDeletedAtIsNullOrderByCreatedAtAsc(discussionId)
                .stream().map(c -> {
                    CommentDto dto = new CommentDto();
                    dto.setId(c.getId());
                    return dto;
                }).collect(Collectors.toList());
    }
}
