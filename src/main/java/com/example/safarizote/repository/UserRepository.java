package com.example.safarizote.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.safarizote.model.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
}