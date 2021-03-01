package com.example.safarizote.repository;

import com.example.safarizote.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Integer> {
  Category findByName(String name);
}
