package com.example.safarizote.repository;

import java.time.Instant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.safarizote.model.Email;

@Component
public class EmailLoader implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(EmailLoader.class);

    @Autowired
    private EmailRepository repository;

    @Override
    public void run(String... args) throws Exception {
        if (repository.count() > 0) {
            return;
        }
        
        repository.save(Email.builder().name("Jack Maji Moto Smith").email("mkunsim@gmail.com").phone("212 212 212").message("21 Jump street").dateCreated(Instant.now()).build());
        repository.save(Email.builder().name("Adam Moto Wake").email("maji@gmail.com").phone("212 212 213").message("Grefsen Platåen").dateCreated(Instant.now()).build());
        repository.save(Email.builder().name("Johnson Katana Ndovu").email("moto@hotmail.com").phone("212 212 214").message("Maridalsveien").dateCreated(Instant.now()).build());
        repository.save(Email.builder().name("Peter Ngara Mwendwa").email("kazi@online.no").phone("212 212 215").message("Number 10").dateCreated(Instant.now()).build());
        repository.save(Email.builder().name("Masinde Murilo David").email("sverige@kora.se").phone("212 212 216").message("Downings Street").dateCreated(Instant.now()).build());

        repository.findAll().forEach((email) -> {
            logger.info("{}", email);
        });
    }
}