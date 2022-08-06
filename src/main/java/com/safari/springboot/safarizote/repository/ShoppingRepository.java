package com.safari.springboot.safarizote.repository;


import com.safari.springboot.safarizote.model.Shopping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ShoppingRepository extends JpaRepository<Shopping, Long>{

}