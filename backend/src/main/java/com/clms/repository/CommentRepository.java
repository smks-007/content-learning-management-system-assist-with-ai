package com.clms.repository;

import com.clms.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID> {
    List<Comment> findByDiscussionIdAndDeletedAtIsNullOrderByCreatedAtAsc(UUID discussionId);
    int countByDiscussionIdAndDeletedAtIsNull(UUID discussionId);
}
