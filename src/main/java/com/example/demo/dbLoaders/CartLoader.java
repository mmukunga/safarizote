package com.example.demo.dbLoaders;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Stream;

import com.example.demo.model.Cart;
import com.example.demo.model.CartItem;
import com.example.demo.repository.CartRepository;

@Component
public class CartLoader implements CommandLineRunner {

    private final CartRepository repository;

    public CartLoader(CartRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        // logger.info("Application has started");
        if (repository.count() > 0) {
            return;
        }
        Stream.of("1stBooking").forEach(name -> repository.save(Cart.builder().auth("true").build()));
        Set<Cart> djug = repository.findByAuth("true");

        CartItem e = CartItem.builder()
            .description("description")
            .email("email")
            .image("image")
            .dateCreated(Instant.now())
            .quantity(10)
            .build();
        Optional<Cart> djugOne = djug.stream().findFirst();
        if (djugOne.isPresent()) {
            djugOne.get().getItems().add(e);
        } else {
            Set<CartItem> items = new HashSet<>();
            items.add(e);
            djugOne.get().setItems(items);
        }

        repository.save(djugOne.get());
        //repository.findAll().forEach(System.out::println);
    }
}