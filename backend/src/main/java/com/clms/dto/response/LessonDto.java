package com.clms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class LessonDto {
    private UUID id;
    private String title;
    private String content;
    private int orderIndex;
    private int duration;
    private String lessonType;
    private UUID courseId;
    private String videoUrl;
    private String pdfUrl;
    private boolean isPreview;
    private List<Object> resources;
    private boolean isCompleted;
    private int watchedDuration;

    public String getDescription() {
        return content;
    }
    public void setDescription(String description) {
        this.content = description;
    }
}
