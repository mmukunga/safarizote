package com.example.safarizote.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.safarizote.model.Email;

@Repository
public interface EmailRepository extends JpaRepository<Email, Long> {
    Set< Email> findByEmail(String email);
}