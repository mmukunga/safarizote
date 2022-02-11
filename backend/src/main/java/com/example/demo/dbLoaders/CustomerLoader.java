package com.example.demo.dbLoaders;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Stream;

import javax.transaction.Transactional;

import com.example.demo.model.Event;
import com.example.demo.model.Customer;
import com.example.demo.repository.CustomerRepository;

@Component
@Transactional
class CustomerLoader implements CommandLineRunner {

    private final CustomerRepository repository;

    public CustomerLoader(CustomerRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        if (repository.count() > 0) {
            return;
        }

        Stream.of("Denver JUG", "Utah JUG", "Seattle JUG",
                "Richmond JUG").forEach(
                        name -> repository.save(Customer.builder()
                                .name(name)
                                .email("maji@gmail.com")
                                .phone("414 12 999")
                                .message("My Message")
                                .build()));
        Customer djug = repository.findByName("Denver JUG");
        Event e = Event.builder().title("Full Stack Reactive")
                .description("Reactive with Spring Boot + React")
                .date(Instant.parse("2018-12-12T18:00:00.000Z"))
                .build();
                
        if (Objects.nonNull(djug.getEvents())) {
            djug.getEvents().add(e);
        } else {
            Set<Event> setA = new HashSet<>();
            setA.add(e);
            djug.setEvents(setA);
        }

        repository.save(djug);
        //repository.findAll().forEach(System.out::println);
    }
}