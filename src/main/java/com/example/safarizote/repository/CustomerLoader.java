package com.example.safarizote.repository;

import java.time.Instant;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.safarizote.model.Customer;

@Component
public class CustomerLoader implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(CustomerLoader.class);

    @Autowired
    private CustomerRepository repository;

    @Override
    public void run(String... args) throws Exception {
        if (repository.count() > 0) {
            return;
        }
        
        repository.save(Customer.builder().name("Jack Maji Moto Smith").email("m@gmail.com").phone("415 22 386").address("21 Jump street").dateCreated(Instant.now()).build());
        repository.save(Customer.builder().name("Adam Moto Wake").email("maji@gmail.com").phone("915 22 111").address("Grefsen Platåen").dateCreated(Instant.now()).build());
        repository.save(Customer.builder().name("Johnson Katana Ndovu").email("moto@hotmail.com").phone("222 22 222").address("Maridalsveien").dateCreated(Instant.now()).build());
        repository.save(Customer.builder().name("Peter Ngara Mwendwa").email("kazi@online.no").phone("911 22 911").address("Number 10").dateCreated(Instant.now()).build());
        repository.save(Customer.builder().name("Masinde Murilo David").email("sverige@kora.se").phone("+44 510 22 777").address("Downings Street").dateCreated(Instant.now()).build());

        repository.findAll().forEach((customer) -> {
            logger.info("{}", customer);
        });
    }
}