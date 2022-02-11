package com.example.safarizote.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.safarizote.model.ContactUs;

public interface ContactUsRepository extends JpaRepository<ContactUs, Long> {
    ContactUs findByEmail(String email);
}