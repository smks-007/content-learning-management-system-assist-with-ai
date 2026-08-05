package com.clms.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class CreateLessonRequest {
    @NotBlank private String title;
    private String content;
    private int orderIndex = 0;
    private int duration = 0;
    private String lessonType = "TEXT";
    @NotNull private UUID courseId;
    private boolean isPreview = false;
    private String videoUrl;
    private String pdfUrl;

    public String getDescription() {
        return content;
    }
}
