package com.bravex.bravex.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.bravex.bravex.dto.CreateOrderRequest;
import com.bravex.bravex.dto.CreateOrderResponse;
import com.bravex.bravex.entity.OrderItem;
import com.bravex.bravex.entity.Orders;
import com.bravex.bravex.entity.Product;
import com.bravex.bravex.entity.ShippingMethods;
import com.bravex.bravex.repository.OrderItemRepository;
import com.bravex.bravex.repository.OrdersRepository;
import com.bravex.bravex.repository.ProductRepository;
import com.bravex.bravex.repository.ShippingMethodsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrdersService {
    private final OrdersRepository ordersRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final ShippingMethodsRepository shippingMethodsRepository;

    public List<Orders> getAllOrders() {
        return ordersRepository.findAll();
    }

    public Orders getOrderById(Long id) {
        return ordersRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));
    }

    @Transactional
    public CreateOrderResponse createOrder(CreateOrderRequest request) {
        ShippingMethods shippingMethod = shippingMethodsRepository.findById(request.getShippingMethodId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Shipping method not found"));

        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal subtotal = BigDecimal.ZERO;

        for (CreateOrderRequest.OrderItemInput itemInput : request.getItems()) {
            Product product = productRepository.findById(itemInput.getProductId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found: " + itemInput.getProductId()));

            BigDecimal productPrice = product.getPrice();
            BigDecimal lineTotal = productPrice.multiply(BigDecimal.valueOf(itemInput.getQuantity()));
            subtotal = subtotal.add(lineTotal);

            OrderItem orderItem = new OrderItem();
            orderItem.setProductId(product.getId());
            orderItem.setQuantity(itemInput.getQuantity());
            orderItem.setPrice(productPrice);
            orderItems.add(orderItem);
        }

        BigDecimal deliveryCost = shippingMethod.getPrice();
        BigDecimal totalAmount = subtotal.add(deliveryCost);

        Orders order = new Orders();
        order.setEmail(request.getEmail());
        order.setPhone(request.getPhone());
        order.setFirstName(request.getFirstName());
        order.setLastName(request.getLastName());
        order.setCountry(request.getCountry());
        order.setStateRegion(request.getStateRegion());
        order.setAddress(request.getAddress());
        order.setCity(request.getCity());
        order.setPostalCode(request.getPostalCode());
        order.setShippingMethodId(shippingMethod.getId());
        order.setSubtotal(subtotal);
        order.setDeliveryCost(deliveryCost);
        order.setTotalAmount(totalAmount);
        order.setStatus("PENDING");
        order.setOrderDate(LocalDateTime.now());

        Orders savedOrder = ordersRepository.save(order);

        for (OrderItem orderItem : orderItems) {
            orderItem.setOrderId(savedOrder.getId());
        }
        orderItemRepository.saveAll(orderItems);

        return CreateOrderResponse.builder()
            .id(savedOrder.getId())
            .status(savedOrder.getStatus())
            .subtotal(savedOrder.getSubtotal())
            .deliveryCost(savedOrder.getDeliveryCost())
            .totalAmount(savedOrder.getTotalAmount())
            .orderDate(savedOrder.getOrderDate())
            .build();
    }
}
