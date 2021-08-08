package com.example.safarizote.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Param;
import org.springframework.data.jpa.repository.Transactional;
import org.springframework.stereotype.Repository;

import com.example.safarizote.model.Metrics;

@Repository
public interface MetricsRepository extends JpaRepository<Metrics, Long> {
    Set<Metrics> findByUrl(String url);
    @Transactional
    @Modifying
    @Query("delete from Metrics c WHERE c.url=:url")
    Set<Metrics> deleteByUrl(@Param("url") String url);
}