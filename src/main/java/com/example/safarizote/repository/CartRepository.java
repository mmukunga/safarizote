package com.example.safarizote.repository;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.safarizote.model.Booking;

@Component
@SessionScope
public interface CartRepository extends JpaRepository<Booking, Long> {
    Set<Booking> findBySafariId(String safariId);
}
