package com.clms.dto.response;

import lombok.Builder;
import lombok.Data;

@Data @Builder
public class AiResponse {
    private String content;
    private String sessionId;
    private String model;
    private int tokensUsed;
}
