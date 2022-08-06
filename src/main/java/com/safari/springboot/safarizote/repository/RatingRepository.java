package com.safari.springboot.safarizote.repository;


import com.safari.springboot.safarizote.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RatingRepository extends JpaRepository<Rating, Long>{

}