package com.example.safarizote;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import com.example.safarizote.model.Safari;

@SpringBootApplication
public class SafarizoteApplication {

	public static void main(String[] args) {
		SpringApplication.run(SafarizoteApplication.class, args);
	}

    @Bean
    @Scope("application")
    public Map<Integer, Safari> catalog() {
        Map<Integer, Safari> items = new HashMap<>();
        items.put(0, Safari.builder().id(0L).title("3 days Masai Mara").details("Masai Mara").summary("Mara by Car").price(2499.99).dateCreated(Instant.now()).build());
        items.put(1, Safari.builder().id(1L).title("One day Nairobi City Tour").details("Nairobi City").summary("Ngong Karen Etc..").price(15.99).dateCreated(Instant.now()).build());
        items.put(2, Safari.builder().id(2L).title("Two days Amboseli").details("Amboseli and Tsavo").summary("Amboseli").price(1800.99).dateCreated(Instant.now()).build());
        items.put(3, Safari.builder().id(3L).title("Mount Kenya 5 Days").details("Mount Kenya").summary("Mount Kenya").price(10.59).dateCreated(Instant.now()).build());
        items.put(4, Safari.builder().id(4L).title("Kilimanjaro 6 days").details("Kilimanjaro").summary("Kilimanjaro").price(200.59).dateCreated(Instant.now()).build());
        items.put(5, Safari.builder().id(5L).title("Lake Nakuru").details("Lake Nakuru").summary("Lake Nakuru").price(159.99).dateCreated(Instant.now()).build());
        return items;
    }
}