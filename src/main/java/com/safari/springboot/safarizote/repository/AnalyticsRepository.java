package com.safari.springboot.safarizote.repository;


import com.safari.springboot.safarizote.model.Analytics;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AnalyticsRepository extends JpaRepository<Analytics, Long>{
   @Query(value = "SELECT max(id) FROM Analytics")
    public Long getMaxId();
    public List<Analytics> findByIpv4(String ipv4);
}