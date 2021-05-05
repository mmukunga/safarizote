package com.example.safarizote.repository;

import com.example.safarizote.model.BackUp;
import org.springframework.data.jpa.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BackUpRepository extends CrudRepository<BackUp,Integer> {
    BackUp findByName(String name);
}
