package com.clms.repository;

import com.clms.entity.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface InstructorRepository extends JpaRepository<Instructor, UUID> {
    Optional<Instructor> findByUserId(UUID userId);
    boolean existsByUserId(UUID userId);
}
