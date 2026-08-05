package com.clms.dto.request;

import lombok.Data;

@Data
public class CreateOptionRequest {
    private String optionText;
    private boolean isCorrect;
    private int orderIndex;
}
