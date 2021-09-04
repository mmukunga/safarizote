package com.example.safarizote.repository;

import com.example.safarizote.model.BackUp1;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BackUp1Repository extends JpaRepository<BackUp1,Integer> {
    BackUp1 findByName(String name);
}
