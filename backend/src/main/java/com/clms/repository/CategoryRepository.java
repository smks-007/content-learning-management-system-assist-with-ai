package com.clms.repository;

import com.clms.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
    List<Category> findByParentCategoryIsNull();
    boolean existsByName(String name);
}
