package com.clms.service;

import com.clms.dto.request.CreateNotificationRequest;
import com.clms.dto.response.NotificationDto;
import com.clms.entity.Notification;
import com.clms.entity.User;
import com.clms.exception.ResourceNotFoundException;
import com.clms.repository.NotificationRepository;
import com.clms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public Page<NotificationDto> getNotifications(UUID userId, Pageable pageable) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable)
                .map(n -> {
                    NotificationDto dto = new NotificationDto();
                    dto.setId(n.getId());
                    dto.setTitle(n.getTitle());
                    dto.setMessage(n.getMessage());
                    dto.setRead(n.isRead());
                    dto.setCreatedAt(n.getCreatedAt());
                    return dto;
                });
    }

    public void markAsRead(UUID notifId, UUID userId) {
        Notification notification = notificationRepository.findById(notifId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", notifId));
        if (notification.getUser().getId().equals(userId)) {
            notification.setRead(true);
            notification.setReadAt(LocalDateTime.now());
            notificationRepository.save(notification);
        }
    }

    public void markAllAsRead(UUID userId) {
        notificationRepository.markAllAsReadForUser(userId);
    }

    public void deleteNotification(UUID id, UUID userId) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", id));
        if (notification.getUser().getId().equals(userId)) {
            notificationRepository.delete(notification);
        }
    }

    public void createNotification(CreateNotificationRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getUserId()));
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setTitle(request.getTitle());
        notification.setMessage(request.getMessage());
        notificationRepository.save(notification);
    }

    public void createSystemNotification(UUID userId, String title, String message) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setTitle(title);
        notification.setMessage(message);
        notificationRepository.save(notification);
    }
}
