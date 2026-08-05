package com.clms.repository;

import com.clms.entity.AiLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AiLogRepository extends JpaRepository<AiLog, UUID> {
    Page<AiLog> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<AiLog> findByUserIdOrderByCreatedAtDesc(UUID userId, Pageable pageable);
    long countByIsSuccessTrue();
    long countByIsSuccessFalse();
}
