package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Safari;

public interface SafariRepository extends JpaRepository<Safari, Long> {
    Safari findByTitle(String title);
}