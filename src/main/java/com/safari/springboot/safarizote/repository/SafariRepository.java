package com.safari.springboot.safarizote.repository;


import com.safari.springboot.safarizote.model.Safari;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SafariRepository extends JpaRepository<Safari, Long>{

}