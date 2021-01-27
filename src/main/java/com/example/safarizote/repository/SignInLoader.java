package com.example.safarizote.repository;

import java.time.Instant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.safarizote.model.UserAuth;

@Component
public class SignInLoader implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(SignInLoader.class);

    @Autowired
    private SignInRepository repository;

    @Override
    public void run(String... args) throws Exception {
        if (repository.count() > 0) {
            return;
        }
        
        repository.save(UserAuth.builder().email("mkunsim@gmail.com").password("12345").dateCreated(Instant.now()).build());
        repository.save(UserAuth.builder().email("maji@gmail.com").password("67890").dateCreated(Instant.now()).build());
        repository.save(UserAuth.builder().email("moto@hotmail.com").password("abcde").dateCreated(Instant.now()).build());
        repository.save(UserAuth.builder().email("kazi@online.no").password("fghij").dateCreated(Instant.now()).build());
        repository.save(UserAuth.builder().email("sverige@kora.se").password("a1a1a").dateCreated(Instant.now()).build());

        repository.findAll().forEach((email) -> {
            logger.info("{}", email);
        });
    }
}