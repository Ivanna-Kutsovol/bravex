package com.bravex.bravex.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.bravex.bravex.entity.Category;
import com.bravex.bravex.service.CategoryService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoriesController {
    private final CategoryService categoryService;

    @GetMapping
    public List<Category> all() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public Category one(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }
}
