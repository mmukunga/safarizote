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
            .title("3 Days 2 Nights Maasai Mara – Masai mara safari package")
            .price(450.00)
            .description("<div class='SafariDetails'><img src='images/cheeter.jpg' class='SafariSnap' alt='3 Days 2 Nights Maasai Mara – Masai mara safari package' align='top'/> The Masai Mara reserve will tickle your thrill spot with Kenya’s richest concentration of wildlife. The lush golden grassland plains are filled with plentiful zebras, lions and wild beasts, with a real-life alacrity of on-camera safari expeditions.This acacia land brings you goosebumps with the cheerful sight of the five giants, the elephants, rhinos, lions, leopards and the wild buffaloes. Feel the intriguing sense of nomadic life with captivating day-time activities and splendid overnight stays at camps or lodges on this trip to Masai Mara. <p>Below are the details for the 3 Day Masaai Mara Safari:</p><p><strong>DAY 1: NAIROBI – MASAI MARA</strong></p> <p>Pick up from Airport of Place of Residence in Nairobi at 7:00am, Your safari takes you to the Maasai Mara Reserve and into the domain of the Maasai, Kenya’s cattle-herding nomads determined to preserve their traditions. Arrival in Masai Mara in time for lunch, after lunch embark on an evening Game drive until Late evening when you settle for dinner and overnight. accommodation overnight at either Mara Sopa Lodge, Mara Serena Safari Lodge, Ashnil Mara Tented Camp or Mara Sarova Game Camp</p><p><strong>DAY 2: MASAI MARA</strong></p> <p>Spend the day in Masai Mara, Kenya’s most popular game reserve where you will have the best opportunity of spotting the Big Five – lion, leopard, buffalo, rhino and elephant, Game drives are flexible, with the option of going out with picnic lunch boxes to spend entire day in the park, or you can choose to have early morning and late afternoon game drives. You will also have the option of visiting a local Masai village (at a cost of US$20 per person).</p> <p>All meals and overnight at either Mara Sopa Lodge, Mara Serena Safari Lodge, Ashnil Mara Tented Camp or Mara Sarova Game Camp</p> <p><strong>DAY 3: Masai Mara National Reserve – Nairobi</strong></p> <p>Early Morning breakfast at your camp check out of the camp and park and drive to Nairobi arriving in time for lunch. Lunch at carnivore afterwards drop off at your respective hotel or airport at 3:30 PM.</p> </div>")
            .dateCreated(Instant.now())
            .build());

        repository.save(Safari.builder()
            .title("1 Day Nairobi National Park,Elephant Center-Giraffes & Karen Blixen Full day tour")
            .price(150.00)
            .description("<div class='SafariDetails'><img src='images/gnus.jpg' class='SafariSnap' alt='1 Day Nairobi National Park,Elephant Center-Giraffes & Karen Blixen Full day tour' align='top'/> This full day tour is an excellent way to begin or end your East Africa safari. Search out wildlife at Nairobi National Park, on the outskirts of Nairobi. Enjoy lunch at a local restaurant and visit the Karen Blixen Museum. Stop by the Giraffe Center for a close up look at the endangered Rothschild giraffe1 full day Nairobi National Park tour, Baby elephant Giraffes & Karen Blixen Museum Tour in Nairobi. <p><strong>Important Details</strong></p> Included <ul><li>Safari van with open roof</li><li>pickup and Drop off-Nairobi Hotel/Apartment/Airport</li><li>Driver Guide</li></ul> Not Included <ul><li></li></ul> Additional Info <ul><li>Public transportation options are available nearby</li><li>Suitable for all physical fitness levels</li></ul> Meeting Point <p> We will pick up and drop off At any Nairobi Hotel/Apartment/Airport</p></div>")
            .dateCreated(Instant.now())
            .build());

        repository.save(Safari.builder()
            .title("3 Days Amboseli and Tsavo")
            .price(500.00)
            .description("<div class='SafariDetails'><img src='images/leopard.jpg' class='SafariSnap' alt='Longtail boat in Thailand' align='top'/> Amboseli safari tours, for the wild at heart. Amboseli National Park is one of the world's most amazing national parks.</div>")
            .dateCreated(Instant.now())
            .build());
        
        repository.save(Safari.builder()
            .title("1 Day Lake Nakuru National Park Trip")
            .price(175.00)
            .description("<div class='SafariDetails'><img src='images/savannah.jpg' class='SafariSnap' alt='Longtail boat in Thailand' align='top'/> Highlight: Enjoy a full-day tour of Lake Nakuru National Park, home to one of the most remarkable wild bird populations in all of Africa. Get up close with the wildlife on a game viewing drive, and be on the lookout for the park's amazing flamingos.</div>")
            .dateCreated(Instant.now())
            .build());

        repository.save(Safari.builder()
            .title("6 days Kilimanjaro Climb - Rongai Route")
            .price(1450.00)
            .description("<div class='SafariDetails'><img src='images/tourists.jpg' class='SafariSnap' alt='Longtail boat in Thailand' align='top'/> Rongai Route Kilimanjaro Climb, this is the third popular route on Kilimanjaro and involves much shorter approach to Kibo than the Marangu Route. Climb Kilimanjaro from Kenya via the Rongai Route (6 days)</div>")
            .dateCreated(Instant.now())
            .build());

        repository.save(Safari.builder()
            .title("5 Days Mount Kenya Trekking Sirimon – Chogoria")
            .price(945.00)
            .description("<div class='SafariDetails'><img src='images/jeep.jpg' class='SafariSnap' alt='Longtail boat in Thailand' align='top'/> This 5 Days Mount Kenya Trekking Sirimon-Chogoria Route peak circuiting program offers some of the finest mountain trekking experience in East Africa!</div>")
            .dateCreated(Instant.now())
            .build());
        
        repository.save(Safari.builder()
            .title("7 Days Kenya Beach Holiday and Amboseli")
            .price(1550.00)
            .description("<div class='SafariDetails'><img src='images/cheeters.jpg' class='SafariSnap' alt='Longtail boat in Thailand' align='top'/> Kenya has so much to offer the visitor - from the vast plains of the iconic Masai Mara and Amboseli teeming with wildlife to the white sand beaches of the Indian Ocean.</div>")
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