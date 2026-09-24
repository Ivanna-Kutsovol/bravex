package com.bravex.bravex.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bravex.bravex.entity.ProductImage;
import com.bravex.bravex.repository.ProductImageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductImageService {
    private final ProductImageRepository productImageRepository;

    public List<ProductImage> getAllImages() {
        return productImageRepository.findAll();
    }

    public List<ProductImage> getImagesByProductId(Long productId) {
        return productImageRepository.findByProductId(productId);
    }
}
