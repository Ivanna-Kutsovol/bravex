package com.bravex.bravex.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bravex.bravex.entity.Product;
import com.bravex.bravex.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> getProducts(Long categoryId, String search) {
        String normalizedSearch = search == null ? "" : search.trim();
        boolean hasSearch = !normalizedSearch.isEmpty();

        if (categoryId != null && hasSearch) {
            return productRepository.findTop6ByCategoryIdAndNameContainingIgnoreCaseOrderByNameAsc(categoryId, normalizedSearch);
        }
        if (categoryId != null) {
            return productRepository.findByCategoryId(categoryId);
        }
        if (hasSearch) {
            return productRepository.findTop6ByNameContainingIgnoreCaseOrderByNameAsc(normalizedSearch);
        }
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow();
    }
}
