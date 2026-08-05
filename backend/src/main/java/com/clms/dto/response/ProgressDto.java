package com.clms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProgressDto {
    private UUID id;
    private UUID lessonId;
    private UUID studentId;
    private boolean completed;
    private int lastWatchedPosition;
}
