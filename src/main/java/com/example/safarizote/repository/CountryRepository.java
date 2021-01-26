package com.example.safarizote.repository;

import java.util.Optional;

import com.example.safarizote.model.Country;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryRepository extends JpaRepository<Country,Integer> {
    Optional<Country> findByCode(String code);
}