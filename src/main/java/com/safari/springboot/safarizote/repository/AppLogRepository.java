package com.safari.springboot.safarizote.repository;

import com.safari.springboot.safarizote.model.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppLogRepository extends JpaRepository<Log, Long> {

}