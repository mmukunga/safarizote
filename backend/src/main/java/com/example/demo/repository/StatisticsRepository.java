package com.example.demo.repository;

import java.time.Instant;
import java.util.List;
import java.util.Set;

import com.example.demo.model.Statistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StatisticsRepository extends JpaRepository<Statistics, Long> {
    Set<Statistics> findByPageview(String pageview);
    @Query("SELECT s.pageview, sum(s.quantity) as quantity FROM Statistics s WHERE s.dateCreated > :dateCreated GROUP BY s.pageview")
    List<Object[]> getByDateCreated(@Param("dateCreated") Instant dateCreated);
}
