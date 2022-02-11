package com.example.safarizote.repository;

import com.example.safarizote.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingsRepository extends JpaRepository<Rating, Long> {
    Rating findByName(String name);
}
