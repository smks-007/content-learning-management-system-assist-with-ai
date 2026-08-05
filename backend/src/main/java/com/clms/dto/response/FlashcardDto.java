package com.clms.dto.response;

import lombok.Builder;
import lombok.Data;

@Data @Builder
public class FlashcardDto {
    private String front;
    private String back;
}
