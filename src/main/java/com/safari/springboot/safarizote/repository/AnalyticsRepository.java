package com.safari.springboot.safarizote.repository;


import com.safari.springboot.safarizote.model.Analytics;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnalyticsRepository extends JpaRepository<Analytics, Long>{
   List<Analytics> findByIPv4(String iPv4);
}