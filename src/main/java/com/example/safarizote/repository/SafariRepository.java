package com.example.safarizote.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.safarizote.model.Safari;

@Repository
public interface SafariRepository extends JpaRepository<Safari, Long> {
}