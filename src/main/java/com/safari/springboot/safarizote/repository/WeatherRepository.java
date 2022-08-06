package com.safari.springboot.safarizote.repository;

import com.safari.springboot.safarizote.model.Weather;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeatherRepository extends JpaRepository<Weather, Long>{

}