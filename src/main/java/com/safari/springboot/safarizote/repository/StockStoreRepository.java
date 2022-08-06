package com.safari.springboot.safarizote.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import com.safari.springboot.safarizote.model.StockStore;

@Repository
public interface StockStoreRepository extends JpaRepository<StockStore, Long> {
    Optional<StockStore> findBySymbol(String symbol);
    @Query(value = "SELECT max(id) FROM StockStore")
    public Long getMaxId();
}