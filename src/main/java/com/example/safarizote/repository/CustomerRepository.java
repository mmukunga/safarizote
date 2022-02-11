package com.example.safarizote.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.safarizote.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByName(String name);
}