package com.example.safarizote.repository;

import java.time.Instant;

import com.example.safarizote.model.Users;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class UserLoader implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(UserLoader.class);

    @Autowired
    private UserRepository repository;

    @Override
    public void run(String... args) throws Exception {
        if (repository.count() > 0) {
            return;
        }
        
        repository.save(Users.builder().email("m@gmail.com").password("12345").dateCreated(Instant.now()).build());
        repository.save(Users.builder().email("maji@gmail.com").password("sms1").dateCreated(Instant.now()).build());
        repository.save(Users.builder().email("moto@hotmail.com").password("sms2").dateCreated(Instant.now()).build());
        repository.save(Users.builder().email("kazi@online.no").password("sms3").dateCreated(Instant.now()).build());
        repository.save(Users.builder().email("sverige@kora.se").password("sms4").dateCreated(Instant.now()).build());

        repository.findAll().forEach((user) -> {
            logger.info("{}", user);
        });
    }
}