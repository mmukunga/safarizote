package com.example.safarizote.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.safarizote.model.Shopping;

@Repository
public interface ShoppingRepository extends JpaRepository<Shopping, Long> {
    Set<Shopping> findByName(String name);
}