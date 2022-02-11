package com.example.demo.repository;

import java.util.Set;

import com.example.demo.model.UserAuth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAuthRepository extends JpaRepository<UserAuth, Integer> {
    UserAuth findByEmail(String email);
    Set<UserAuth> findByToken(String token);
}
