package com.example.safarizote.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.safarizote.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}