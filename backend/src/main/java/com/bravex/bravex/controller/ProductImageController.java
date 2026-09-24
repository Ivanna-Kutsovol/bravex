package com.bravex.bravex.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bravex.bravex.entity.ProductImage;
import com.bravex.bravex.service.ProductImageService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductImageController {
    private final ProductImageService productImageService;

    @GetMapping("/images")
    public List<ProductImage> allImages() {
        return productImageService.getAllImages();
    }

    @GetMapping("/{id}/images")
    public List<ProductImage> imagesByProduct(@PathVariable Long id) {
        return productImageService.getImagesByProductId(id);
    }

}
