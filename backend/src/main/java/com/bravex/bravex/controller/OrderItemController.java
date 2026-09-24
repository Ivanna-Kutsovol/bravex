package com.bravex.bravex.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bravex.bravex.entity.OrderItem;
import com.bravex.bravex.service.OrderItemService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/order_items")
@RequiredArgsConstructor
public class OrderItemController {
    private final OrderItemService orderItemService;

    @GetMapping
    public List<OrderItem> all() {
        return orderItemService.getAllOrderItems();
    }

    @GetMapping("/{id}")
    public OrderItem one(@PathVariable Long id) {
        return orderItemService.getOrderItemById(id);
    }

    @GetMapping("/order/{orderId}")
    public List<OrderItem> byOrder(@PathVariable Long orderId) {
        return orderItemService.getOrderItemsByOrderId(orderId);
    }
}
