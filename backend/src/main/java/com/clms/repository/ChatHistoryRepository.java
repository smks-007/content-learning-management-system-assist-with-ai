package com.clms.repository;

import com.clms.entity.ChatHistory;
import com.clms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChatHistoryRepository extends JpaRepository<ChatHistory, UUID> {
    List<ChatHistory> findByUserAndSessionIdOrderByCreatedAtAsc(User user, String sessionId);
    
    @Query("SELECT c FROM ChatHistory c WHERE c.user.id = :userId AND c.sessionId = :sessionId ORDER BY c.createdAt ASC")
    List<ChatHistory> findByUserIdAndSessionIdOrderByCreatedAtAsc(@Param("userId") UUID userId, @Param("sessionId") String sessionId);
    
    List<ChatHistory> findByUserOrderByCreatedAtDesc(User user);
}
