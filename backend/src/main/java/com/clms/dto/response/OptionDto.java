package com.clms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class OptionDto {
    private UUID id;
    private String optionText;
    private int orderIndex;
    private Boolean isCorrect; // null when question not yet answered
}
