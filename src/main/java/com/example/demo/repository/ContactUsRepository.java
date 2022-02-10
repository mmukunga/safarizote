package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.ContactUs;

public interface ContactUsRepository extends JpaRepository<ContactUs, Long> {
    ContactUs findByEmail(String email);
}