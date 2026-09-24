package com.bravex.bravex.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bravex.bravex.entity.Category;
import com.bravex.bravex.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow();
    }
}
