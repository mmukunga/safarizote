package com.example.safarizote.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.safarizote.model.Stock;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {
    @Query(value = "SELECT coalesce(max(id), 0) FROM Stock")
    public Long getMaxId();
}