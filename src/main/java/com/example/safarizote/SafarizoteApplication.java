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
        items.put(0, Safari.builder().id(0L).title("Apple Mac Book Pro").details("<div class='SafariDetails'>").summary("<p>Lake Nakuru</p>").price(2499.99).dateCreated(Instant.now()).build());
        items.put(1, Safari.builder().id(1L).title("32GB San Disk").details("<div class='SafariDetails'>").summary("<p>Lake Nakuru</p>").price(15.99).dateCreated(Instant.now()).build());
        items.put(2, Safari.builder().id(2L).title("OLED 64in TV").details("<div class='SafariDetails'>").summary("<p>Lake Nakuru</p>").price(1800.99).dateCreated(Instant.now()).build());
        items.put(3, Safari.builder().id(3L).title("Wireless Mouse").details("<div class='SafariDetails'>").summary("<p>Lake Nakuru</p>").price(10.59).dateCreated(Instant.now()).build());
        items.put(4, Safari.builder().id(4L).title("Virtual Reality HeadSet").details("<div class='SafariDetails'>").summary("<p>Lake Nakuru</p>").price(200.59).dateCreated(Instant.now()).build());
        items.put(5, Safari.builder().id(5L).title("Sat Nav").details("<div class='SafariDetails'>").summary("<p>Lake Nakuru</p>").price(159.99).dateCreated(Instant.now()).build());
        return items;
    }
}