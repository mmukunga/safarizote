package com.example.safarizote.repository;

import java.time.Instant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.safarizote.model.Shopping;

@Component
public class ShoppingLoader implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(ShoppingLoader.class);

    @Autowired
    private ShoppingRepository repository;

    @Override
    public void run(String... args) throws Exception {
        if (repository.count() > 0) {
            return;
        }
                
        repository.save(Shopping.builder().store("SPAR KJELSÅS").product("KIDNEY BØNNER ELDORADO").price(7.50).quantity(1.0).name("SIMON MUKUNGA").dateCreated(Instant.now()).build());
        repository.save(Shopping.builder().store("SPAR KJELSÅS").product("KIDNEY BØNNER ELDORADO").price(7.50).quantity(1.0).name("SIMON MUKUNGA").dateCreated(Instant.now()).build());
        repository.save(Shopping.builder().store("SPAR KJELSÅS"). product("TOMAT HEL 1/2BX ELDORADO").price(8.90).quantity(1.0).name("SIMON MUKUNGA").dateCreated(Instant.now()).build());
        repository.save(Shopping.builder().store("SPAR KJELSÅS").product("KNEKKEBRØD RUNDA KANEL").price(48.90).quantity(1.0).name("SIMON MUKUNGA").dateCreated(Instant.now()).build());
        repository.save(Shopping.builder().store("SPAR KJELSÅS").product("ALUMINIUMFOLIE TYKK 45").price(22.90).quantity(1.0).name("SIMON MUKUNGA").dateCreated(Instant.now()).build());
        repository.save(Shopping.builder().store("SPAR KJELSÅS").product("KYLLING OVERLØR 600G").price(59.90).quantity(1.0).name("SIMON MUKUNGA").dateCreated(Instant.now()).build());
        repository.save(Shopping.builder().store("SPAR KJELSÅS").product("KYLLING OVERLØR 600G").price(59.90).quantity(1.0).name("SIMON MUKUNGA").dateCreated(Instant.now()).build());
        repository.save(Shopping.builder().store("SPAR KJELSÅS").product("LØK STRØMPE 25ST 450G").price(17.90).quantity(1.0).name("SIMON MUKUNGA").dateCreated(Instant.now()).build());
        repository.save(Shopping.builder().store("SPAR KJELSÅS").product("AASS FATØL 0.5L BX").price(35.90).quantity(1.0).name("SIMON MUKUNGA").dateCreated(Instant.now()).build());
        repository.save(Shopping.builder().store("SPAR KJELSÅS").product("CHILINØTTER 175G ELDORADO").price(10.00).quantity(1.0).name("SIMON MUKUNGA").dateCreated(Instant.now()).build());
        repository.save(Shopping.builder().store("SPAR KJELSÅS").product("COLGATE TANNKREM KARIES").price(18.90).quantity(1.0).name("SIMON MUKUNGA").dateCreated(Instant.now()).build());
        repository.save(Shopping.builder().store("SPAR KJELSÅS").product("LANO SØPE 2x125G").price(23.50).quantity(1.0).name("SIMON MUKUNGA").dateCreated(Instant.now()).build());
        repository.save(Shopping.builder().store("SPAR KJELSÅS").product("KNEIP BRØD 750G FIRST").price(7.90).quantity(1.0).name("SIMON MUKUNGA").dateCreated(Instant.now()).build());
        repository.save(Shopping.builder().store("SPAR KJELSÅS").product("BÆREPOSE").price(2.00).quantity(1.0).name("SIMON MUKUNGA").dateCreated(Instant.now()).build());

        repository.findAll().forEach((shopping) -> {
            logger.info("{}", shopping);
        });
    }
}