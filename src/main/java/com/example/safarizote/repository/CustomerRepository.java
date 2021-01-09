package com.example.safarizote.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.safarizote.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Set<Customer> findByName(String name);
}