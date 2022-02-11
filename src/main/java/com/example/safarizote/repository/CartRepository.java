package com.example.safarizote.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

import com.example.safarizote.model.Cart;

@Repository
public interface CartRepository extends CrudRepository<Cart, Long> {
    Set<Cart> findByAuth(String auth);
}