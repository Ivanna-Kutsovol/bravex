package com.bravex.bravex.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bravex.bravex.entity.Product;
import com.bravex.bravex.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public List<Product> all(
        @RequestParam(required = false) Long categoryId,
        @RequestParam(required = false) String search
    ) {
        return productService.getProducts(categoryId, search);
    }

    @GetMapping("/{id}")
    public Product one(@PathVariable Long id) {
        return productService.getProductById(id);
    }
}
