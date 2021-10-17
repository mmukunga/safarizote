package com.example.safarizote.repository;

import java.util.Set;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.safarizote.model.Metrics;

@Repository
public interface MetricsRepository extends JpaRepository<Metrics, Long> {
    Set<Metrics> findByHostname(String url);
    @Transactional
    List<Metrics> deleteByHostname(String url);
}