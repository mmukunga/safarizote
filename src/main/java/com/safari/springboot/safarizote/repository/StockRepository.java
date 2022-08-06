package com.safari.springboot.safarizote.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.safari.springboot.safarizote.model.Stock;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {
    @Query(value = "SELECT max(id) FROM Stock")
    public Long getMaxId();
}