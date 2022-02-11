package com.example.safarizote.dbLoaders;

import java.time.Instant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.safarizote.model.Statistics;
import com.example.safarizote.repository.StatisticsRepository;

@Component
public class StatisticsLoader implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(StatisticsLoader.class);

    @Autowired
    private StatisticsRepository repository;

    @Override
    public void run(String... args) throws Exception {
        logger.info("StatisticsLoader has started");
        if (repository.count() > 0) {
            logger.info("StatisticsLoader has ENDED!!");
            return;
        }

        repository.save(Statistics.builder()
                .pageview("/")
                .city("Oslo")
                .countryName("Norway")
                .countryCode("NO")
                .iPv4("84.212.216.80")
                .latitude(59.955)
                .longitude(10.859)
                .postal("0458")
                .state("Oslo County")
                .quantity(1)
                .dateCreated(Instant.now())
                .build());

        repository.save(Statistics.builder()
                .pageview("/contactUs")
                .city("Oslo")
                .countryName("Norway")
                .countryCode("NO")
                .iPv4("84.212.216.80")
                .latitude(59.955)
                .longitude(10.859)
                .postal("0458")
                .state("Oslo County")
                .quantity(10)
                .dateCreated(Instant.now())
                .build());
        repository.save(Statistics.builder()
                .pageview("/safaris")
                .city("Drammen")
                .countryName("Norway")
                .countryCode("NO")
                .iPv4("84.212.216.80")
                .latitude(59.955)
                .longitude(10.859)
                .postal("0458")
                .state("Oslo County")
                .quantity(8)
                .dateCreated(Instant.now())
                .build());
        repository.save(Statistics.builder()
                .pageview("/shoppings")
                .city("Oslo")
                .countryName("Norway")
                .countryCode("NO")
                .iPv4("84.212.216.80")
                .latitude(59.955)
                .longitude(10.859)
                .postal("0458")
                .state("Oslo County")
                .quantity(5)
                .dateCreated(Instant.now())
                .build());
        repository.findAll().forEach((tracker) -> {
            logger.info("{}", tracker);
        });

    }
}