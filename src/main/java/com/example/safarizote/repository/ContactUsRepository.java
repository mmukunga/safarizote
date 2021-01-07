package com.example.safarizote.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.safarizote.model.ContactUs;

@Repository
public interface ContactUsRepository extends JpaRepository<ContactUs, Long> {
}