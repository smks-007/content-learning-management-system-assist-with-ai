package com.clms.dto.request;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
public class UpdateCourseRequest {
    private String title;
    private String description;
    private String shortDescription;
    private String thumbnail;
    private BigDecimal price;
    private BigDecimal discountPrice;
    private String level;
    private UUID categoryId;
    private List<String> tags;
    private String language;
    private List<String> requirements;
    private List<String> objectives;
}
