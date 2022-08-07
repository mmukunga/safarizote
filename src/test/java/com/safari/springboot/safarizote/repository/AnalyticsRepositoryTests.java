package com.safari.springboot.safarizote.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.text.ParseException;
import java.time.Instant;
import java.util.Optional;

import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.safari.springboot.safarizote.model.Analytics;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class AnalyticsRepositoryTests {
    @Autowired
    private AnalyticsRepository repository;   

    @Test
    public void findByIdShouldReturnAnalytics() {
       Optional<Analytics> analytics = repository.findById(1L);
       assertThat(analytics).isPresent();
       assertThat(analytics.get().getIpv4()).isEqualTo("84.212.199.3");
    }

    @Test
    public void findByIpv4ShouldReturnAnalytics() {      
       Optional<Analytics> analytics = repository.findByIpv4("84.212.199.3");
       assertThat(analytics).isPresent();
       assertThat(analytics.get().getId()).isNotNull();
    }

    @Test
    public void deleteUser() {
		Optional<Analytics> analytics = repository.findByIpv4("84.212.199.3");
		assertThat(analytics).isPresent();
    	repository.deleteById((long) 7);
    	analytics = repository.findByIpv4("84.212.199.3");
    	assertThat(analytics).isEmpty();
    }

    @Test
    public void createNewAnalytics() throws ParseException {
    	Analytics analytics = Analytics.builder()
        .ipv4("84.212.199.3")
        .city("Oslo County")
        .countryCode("NO")
        .countryName("Norway")
        .dateCreated(Instant.now())
        .build();

    	repository.save(analytics);
    	assertThat(analytics.getId()).isNotNull();
    }    
}
