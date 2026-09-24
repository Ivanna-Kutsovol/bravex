package com.bravex.bravex.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bravex.bravex.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long> {}
