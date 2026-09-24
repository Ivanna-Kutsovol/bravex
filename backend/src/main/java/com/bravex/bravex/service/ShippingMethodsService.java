package com.bravex.bravex.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bravex.bravex.entity.ShippingMethods;
import com.bravex.bravex.repository.ShippingMethodsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShippingMethodsService {
    private final ShippingMethodsRepository shippingMethodsRepository;

    public List<ShippingMethods> getAllShippingMethods() {
        return shippingMethodsRepository.findAll();
    }

    public ShippingMethods getShippingMethodsById(Long id) {
        return shippingMethodsRepository.findById(id).orElseThrow();
    }
}
