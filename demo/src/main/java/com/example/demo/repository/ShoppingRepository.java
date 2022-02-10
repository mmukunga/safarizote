package com.example.demo.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Shopping;

@Repository
public interface ShoppingRepository extends JpaRepository<Shopping, Long> {
    Set<Shopping> findByShop(String shop);
}