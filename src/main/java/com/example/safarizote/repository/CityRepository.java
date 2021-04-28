package com.example.safarizote.repository;

import java.util.Set;

import com.example.safarizote.model.City2;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends JpaRepository<City2,Integer> {
    Set<City2> findByCountry(String country);
}
