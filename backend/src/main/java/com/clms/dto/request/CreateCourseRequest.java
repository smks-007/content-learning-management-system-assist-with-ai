package com.clms.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
public class CreateCourseRequest {
    @NotBlank private String title;
    @NotBlank private String description;
    private String shortDescription;
    private String thumbnail;
    @NotNull private BigDecimal price;
    private BigDecimal discountPrice;
    private String level = "BEGINNER";
    private UUID categoryId;
    private List<String> tags;
    private String language = "English";
    private List<String> requirements;
    private List<String> objectives;
}
