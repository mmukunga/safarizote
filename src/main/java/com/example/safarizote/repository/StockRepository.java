package com.example.safarizote.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.safarizote.model.Ticker;

@Repository
public interface StockRepository extends JpaRepository<Ticker, Long>{
}