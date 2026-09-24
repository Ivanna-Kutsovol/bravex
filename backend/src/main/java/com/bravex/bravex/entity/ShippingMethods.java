package com.bravex.bravex.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "shipping_methods")
@Getter
@Setter
public class ShippingMethods {
    @Id 
    private Long id;

    @Column(name = "name")
    private String name;

    @Column (name = "description")
    private String description;

    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "estimated_delivery")
    private String estimatedDelivery;
}
