package com.safari.springboot.safarizote.repository;

import com.safari.springboot.safarizote.model.AppLogger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppLogRepository extends JpaRepository<AppLogger, Long> {

}