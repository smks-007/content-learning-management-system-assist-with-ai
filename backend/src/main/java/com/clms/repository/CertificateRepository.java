package com.clms.repository;

import com.clms.entity.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CertificateRepository extends JpaRepository<Certificate, UUID> {
    Optional<Certificate> findByVerificationCode(String code);
    List<Certificate> findByStudentId(UUID studentId);
    long countByStudentId(UUID studentId);
    Optional<Certificate> findByStudentIdAndCourseId(UUID studentId, UUID courseId);
    boolean existsByStudentIdAndCourseId(UUID studentId, UUID courseId);
}
