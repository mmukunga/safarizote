package com.example.safarizote.repository;

import java.util.Set;
import com.example.safarizote.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Set<Booking> findByName(String name);
}