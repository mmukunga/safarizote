package com.example.safarizote.repository;

import java.util.List;

import java.time.Instant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.safarizote.model.Booking;
import com.example.safarizote.model.Safari;

@Component
public class SafariLoader implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(SafariLoader.class);

    @Autowired
    private SafariRepository repository;

    @Override
    public void run(String... args) throws Exception {
        if ((repository.count() > 0)) {
            return;
        }
        repository.save(Safari.builder()
            .title("3 Days Masai Mara")
            .price(450.00)
            .description("The 3-days Masai Mara safari tour in Kenya is the shortest and cheapest solution offering the best way to experience the view of African safaris big 5")
            .dateCreated(Instant.now())
            .build());

        repository.save(Safari.builder()
            .title("1 Day Nairobi City Tour")
            .price(150.00)
            .description("On your Nairobi City Tours and Attractions, you will visit places like Nairobi National Park, Karen Blixen Museum, Giraffe Centre, Animal Orphanage")
            .dateCreated(Instant.now())
            .build());

        repository.save(Safari.builder()
            .title("3 Days Amboseli and Tsavo")
            .price(500.00)
            .description("Amboseli safari tours, for the wild at heart. Amboseli National Park is one of the world's most amazing national parks.")
            .dateCreated(Instant.now())
            .build());
        
        repository.save(Safari.builder()
            .title("1 Day Lake Nakuru National Park Trip")
            .price(175.00)
            .description("Highlight: Enjoy a full-day tour of Lake Nakuru National Park, home to one of the most remarkable wild bird populations in all of Africa. Get up close with the wildlife on a game viewing drive, and be on the lookout for the park's amazing flamingos.")
            .dateCreated(Instant.now())
            .build());

        repository.save(Safari.builder()
            .title("6 days Kilimanjaro Climb - Rongai Route")
            .price(1450.00)
            .description("Rongai Route Kilimanjaro Climb, this is the third popular route on Kilimanjaro and involves much shorter approach to Kibo than the Marangu Route. Climb Kilimanjaro from Kenya via the Rongai Route (6 days)")
            .dateCreated(Instant.now())
            .build());

        repository.save(Safari.builder()
            .title("5 Days Mount Kenya Trekking Sirimon – Chogoria")
            .price(945.00)
            .description("This 5 Days Mount Kenya Trekking Sirimon-Chogoria Route peak circuiting program offers some of the finest mountain trekking experience in East Africa!")
            .dateCreated(Instant.now())
            .build());
        
        repository.save(Safari.builder()
            .title("7 Days Kenya Beach Holiday and Amboseli")
            .price(1550.00)
            .description("Kenya has so much to offer the visitor - from the vast plains of the iconic Masai Mara and Amboseli teeming with wildlife to the white sand beaches of the Indian Ocean.")
            .dateCreated(Instant.now())
            .build());

        repository.findAll().forEach((Safari) -> {
            logger.info("{}", Safari);
        });
    }

    public List<Booking> createBookings() {
        List<Booking> bookings = new ArrayList<>();

        bookings.add(Booking.builder().name("Jack Maji Moto Smith").email("m@gmail.com").phone("415 22 386").address("21 Jump street").dateCreated(Instant.now()).build());
        bookings.add(Booking.builder().name("Adam Moto Wake").email("maji@gmail.com").phone("915 22 111").address("Grefsen Platåen").dateCreated(Instant.now()).build());
        bookings.add(Booking.builder().name("Johnson Katana Ndovu").email("moto@hotmail.com").phone("222 22 222").address("Maridalsveien").dateCreated(Instant.now()).build());
        bookings.add(Booking.builder().name("Peter Ngara Mwendwa").email("kazi@online.no").phone("911 22 911").address("Number 10").dateCreated(Instant.now()).build());
        bookings.add(Booking.builder().name("Masinde Murilo David").email("sverige@kora.se").phone("+44 510 22 777").address("Downings Street").dateCreated(Instant.now()).build());

        List<Safari> safaris = repository.findAll();
        Set<Safari> hSet = new HashSet<String>(safaris); 

        System.out.println("Add Bookings");
        for (int i = 0; i < safaris.size(); i++) {
            System.out.println(safaris.get(i));
            Safari safari = safaris.get(i);
            safari.setBookings(hSet);
            repository.save(safari);
        }
 
        System.out.println("Bookings inserted OK!");
    }

}