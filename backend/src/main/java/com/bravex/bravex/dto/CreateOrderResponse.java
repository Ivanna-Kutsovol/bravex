package com.bravex.bravex.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record CreateOrderResponse(
    Long id,
    String status,
    BigDecimal subtotal,
    BigDecimal deliveryCost,
    BigDecimal totalAmount,
    LocalDateTime orderDate
) {}
