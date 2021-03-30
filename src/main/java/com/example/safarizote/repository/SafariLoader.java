package com.example.safarizote.repository;

import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.util.HashSet;

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
        repository.deleteAll();
        if ((repository.count() > 0)) {
            return;
        }
        repository.save(Safari.builder()
            .title("3 Days Masai Mara")
            .price(450.00)
            .description("<p class='sparag'><img src='images/cheeter.jpg' class='simg' alt='Longtail boat in Thailand' align='top'/> The 3-days Masai Mara safari tour in Kenya is the shortest and cheapest solution offering the best way to experience the view of African safaris big 5. Thousands of visitors come to the Mara every year to enjoy some of the most authentic safari experiences in Africa. The Mara is renowned for delivering exceptional big cat (lion, leopard and cheetah) sightings. Cheetahs are particularly well adapted to the region’s flat plains, which makes the Masai Mara one of the best places to see these nimble predators. They often seek vantage points on fallen trees, termite mounds, and even game drive vehicles! It’s a highlight of any Masai Mara safari to watch the world’s fastest land mammal chase down its prey.</p>")
            .dateCreated(Instant.now())
            .build());

        repository.save(Safari.builder()
            .title("1 Day Nairobi City Tour")
            .price(150.00)
            .description("<p class='sparag'><img src='images/gnus.jpg' class='simg' alt='Longtail boat in Thailand' align='top'/> On your Nairobi City Tours and Attractions, you will visit places like Nairobi National Park, Karen Blixen Museum, Giraffe Centre, Animal Orphanage. A Nairobi excursion where you spend a wonderful half day at the historical Karen Blixen museum ( Out of Africa) and with giraffes and baby elephants! Visiting the Giraffe Manor and the Daphne Sheldrick Elephant Orphanage-The David Sheldrick Wildlife Trust: A Haven for Elephants and Rhinos- Nairobi 1 Day Sightseeing Trips: Go On A half Day Nairobi Road viewing the city <br/>  Karen Blixen Museum - \"I had a farm in Africa, at the foot of the Ngong Hills' ...... for those lovers of \"Out of Africa\" the museum will take you back in time to breathe the spirit of the writer and the lives she immortalized.  The Giraffe Centre - This education centre gives you an opportunity to get up close and personal with Rothchild giraffes.  Daphne Sheldrick Elephant Orphanage - Get up close and personal with orphaned elephant (and often rhino). This is where Daphne Sheldrick has perfected the raising and re-integrating of orphaned elephants into the wild. Open to the public from 11.00am - 12.00pm daily.         This is the best excursion ever in Nairobi -A good and educational study african tour or Great for Family and fun out day in nairobi before safari and after safari in kenya!!! <br/> Program Morning Late morning Option <br/> Pick up at hotel or airport at 10.00am <br/> Sheldrick Orphanage11am-12pm-Giraffe center <br/> 12-1.30pmKaren Blixen Museum1.30-3pm <br/> rate Includes-Transport/all entrance fees Optional Lunch at Carnivore restaurant for 30USD</p>")
            .dateCreated(Instant.now())
            .build());

        repository.save(Safari.builder()
            .title("3 Days Amboseli and Tsavo")
            .price(500.00)
            .description("<p class='sparag'><img src='images/leopard.jpg' class='simg' alt='Longtail boat in Thailand' align='top'/> Amboseli safari tours, for the wild at heart. Amboseli National Park is one of the world's most amazing national parks.</p>")
            .dateCreated(Instant.now())
            .build());
        
        repository.save(Safari.builder()
            .title("1 Day Lake Nakuru National Park Trip")
            .price(175.00)
            .description("<p class='sparag'><img src='images/savannah.jpg' class='simg' alt='Longtail boat in Thailand' align='top'/> Highlight: Enjoy a full-day tour of Lake Nakuru National Park, home to one of the most remarkable wild bird populations in all of Africa. Get up close with the wildlife on a game viewing drive, and be on the lookout for the park's amazing flamingos.</p>")
            .dateCreated(Instant.now())
            .build());

        repository.save(Safari.builder()
            .title("6 days Kilimanjaro Climb - Rongai Route")
            .price(1450.00)
            .description("<p class='sparag'><img src='images/tourists.jpg' class='simg' alt='Longtail boat in Thailand' align='top'/> Rongai Route Kilimanjaro Climb, this is the third popular route on Kilimanjaro and involves much shorter approach to Kibo than the Marangu Route. Climb Kilimanjaro from Kenya via the Rongai Route (6 days)</p>")
            .dateCreated(Instant.now())
            .build());

        repository.save(Safari.builder()
            .title("5 Days Mount Kenya Trekking Sirimon – Chogoria")
            .price(945.00)
            .description("<p class='sparag'><img src='images/jeep.jpg' class='simg' alt='Longtail boat in Thailand' align='top'/> This 5 Days Mount Kenya Trekking Sirimon-Chogoria Route peak circuiting program offers some of the finest mountain trekking experience in East Africa!</p>")
            .dateCreated(Instant.now())
            .build());
        
        repository.save(Safari.builder()
            .title("7 Days Kenya Beach Holiday and Amboseli")
            .price(1550.00)
            .description("<p class='sparag'><img src='images/cheeters.jpg' class='simg' alt='Longtail boat in Thailand' align='top'/> Kenya has so much to offer the visitor - from the vast plains of the iconic Masai Mara and Amboseli teeming with wildlife to the white sand beaches of the Indian Ocean.</p>")
            .dateCreated(Instant.now())
            .build());
        
        List<Booking> bookings = createBookings();
        for (int i = 0; i < bookings.size(); i++) {
            System.out.println("New Booking:= " + bookings.get(i));
        }

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
        
        Set<Booking> hSet = new HashSet<Booking>(bookings);

        List<Safari> safaris = repository.findAll(); 
        System.out.println("Add Bookings");
        for (int i = 0; i < safaris.size(); i++) {
            System.out.println(safaris.get(i));
            Safari safari = safaris.get(i);
            safari.setBookings(hSet);
            repository.save(safari);
        }
 
        System.out.println("Bookings inserted OK!");

        return bookings;
    }

}