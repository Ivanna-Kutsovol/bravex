package com.bravex.bravex.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bravex.bravex.dto.CreateOrderRequest;
import com.bravex.bravex.dto.CreateOrderResponse;
import com.bravex.bravex.entity.Orders;
import com.bravex.bravex.service.OrdersService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrdersController {
    private final OrdersService ordersService;

    @GetMapping
    public List<Orders> all() {
        return ordersService.getAllOrders();
    }

    @GetMapping("/{id}")
    public Orders one(@PathVariable Long id) {
        return ordersService.getOrderById(id);
    }

    @PostMapping
    public CreateOrderResponse create(@Valid @RequestBody CreateOrderRequest request) {
        return ordersService.createOrder(request);
    }
}
