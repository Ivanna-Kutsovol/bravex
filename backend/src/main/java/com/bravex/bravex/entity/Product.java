package com.bravex.bravex.entity;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
@Getter
@Setter
public class Product {
    @Id
    private Long id;
    private String sku;
    private String name;

    @Column(name = "short_description")
    private String shortDescription;

    private String description;
    private BigDecimal price;

    @Column(name = "stock_quantity")
    private Integer stockQuantity;

    private String brand;
    private String color;
    private String material;

    @Column(name = "collection_name")
    private String collectionName;

    private BigDecimal width;
    private BigDecimal height;
    private BigDecimal depth;

    @Column (name = "image_url")
    private String imageUrl;

    @Column(name = "is_featured")
    private Boolean isFeatured;

    @Column(name = "is_hero")
    private Boolean isHero;

    @Column(name = "category_id")
    private Long categoryId;

}
