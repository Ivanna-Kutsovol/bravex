package com.bravex.bravex.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bravex.bravex.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);
    List<Product> findTop6ByNameContainingIgnoreCaseOrderByNameAsc(String search);
    List<Product> findTop6ByCategoryIdAndNameContainingIgnoreCaseOrderByNameAsc(Long categoryId, String search);
}
