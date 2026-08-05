package com.clms.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Notification extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String message;
    
    @Enumerated(EnumType.STRING)
    private NotificationType type;
    
    @Builder.Default
    private Boolean isRead = false;
    
    private LocalDateTime readAt;
    private String actionUrl;
    
    public Boolean isRead() {
        return Boolean.TRUE.equals(isRead);
    }
    public void setRead(Boolean read) {
        this.isRead = read;
    }
    
    public enum NotificationType {
        INFO, SUCCESS, WARNING, ERROR
    }
}
