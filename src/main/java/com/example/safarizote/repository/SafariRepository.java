package com.example.safarizote.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.safarizote.model.Safari;

public interface SafariRepository extends JpaRepository<Safari, Long> {
    Safari findByTitle(String title);
}