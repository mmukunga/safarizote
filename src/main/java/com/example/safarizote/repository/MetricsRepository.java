package com.example.safarizote.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.safarizote.model.Metrics;

@Repository
public interface MetricsRepository extends JpaRepository<Metrics, Long> {
    Set<Metrics> findByUrl(String url);
    Set<Metrics> deleteByUrl(String url);
}