package com.example.safarizote.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.safarizote.model.Tracker;

@Repository
public interface TrackerRepository extends JpaRepository<Tracker, Long> {
    Set<Tracker> findByUrl(String url);
}