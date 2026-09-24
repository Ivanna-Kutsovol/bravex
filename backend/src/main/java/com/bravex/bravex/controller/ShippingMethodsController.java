package com.bravex.bravex.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bravex.bravex.entity.ShippingMethods;
import com.bravex.bravex.service.ShippingMethodsService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/shipping-methods")
@RequiredArgsConstructor
public class ShippingMethodsController {
    private final ShippingMethodsService shippingMethodsService;

    @GetMapping
    public List<ShippingMethods> all() {
        return shippingMethodsService.getAllShippingMethods();
    }

    @GetMapping("/{id}")
    public ShippingMethods one(@PathVariable Long id) {
        return shippingMethodsService.getShippingMethodsById(id);
    }
}
