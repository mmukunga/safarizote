package com.example.safarizote.repository;

import java.util.Set;

import com.example.safarizote.model.City;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends JpaRepository<City,Integer> {
    Set<City> findByCountry(String country);
}
