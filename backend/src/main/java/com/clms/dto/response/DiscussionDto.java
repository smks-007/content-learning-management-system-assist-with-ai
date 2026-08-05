package com.clms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class DiscussionDto {
    private UUID id;
    private UUID courseId;
    private UUID lessonId;
    private UUID authorId;
    private String authorName;
    private String authorAvatar;
    private String title;
    private String content;
    private boolean isPinned;
    private int commentCount;
    private LocalDateTime createdAt;
}
