package com.example.safarizote.repository;

import java.util.Set;

import com.example.safarizote.model.UserAuth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SignInRepository extends JpaRepository<UserAuth,Integer> {
    Set<UserAuth> findByEmail(String email);
}
