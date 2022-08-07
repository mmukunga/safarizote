package com.safari.springboot.safarizote.utils;

import java.util.Random;

import com.safari.springboot.safarizote.model.Safari;
import com.safari.springboot.safarizote.repository.SafariRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class SafarisBuilder implements CommandLineRunner {
    @Autowired
    private SafariRepository repository;

    @Override
    public void run(String...args) throws Exception {
        Random rand = new Random();
		
		System.out.println("Application has started");
        if (repository.count() > 0) {
            return;
        }
        this.repository.save( Safari.builder()
			.title("<span>Three Days Masaai Mara.</span>")
			.description("The Masai Mara reserve will tickle your thrill spot with Kenyaâ€™s richest concentration of wildlife. The lush golden grassland plains are filled with plentiful zebras, lions and wild beasts, with a real-life alacrity of on-camera safari expeditions.This acacia land brings you goosebumps with the cheerful sight of the five giants, the elephants, rhinos, lions, leopards and the wild buffaloes. Feel the intriguing sense of nomadic life with captivating day-time activities and splendid overnight stays at camps or lodges on this trip to Masai Mara.")
			.image("https://picsum.photos/200/300?random="+rand.nextInt(50))
			.price(450.00)
			.build());
        this.repository.save(Safari.builder()
			.title("<span>Three Days Safari from Nairobi to Amboseli and Tsavo East ending in Mombasa.</span>")
			.description("This is a 3 Days Safari from Nairobi to Amboseli National Park which is located at the foot of Mount Kilimanjaro â€“ Africaâ€™s highest mountain. Amboseli offers excellent opportunities to view Kenyaâ€™s animals, make it one of the most-visited safari parks in Kenya.")
			.image("https://picsum.photos/200/300?random="+rand.nextInt(50))
			.price(500.00)
			.build());
        this.repository.save(Safari.builder()
			.title("<span>One Full day tour Nairobi National Park, Elephant Center-Giraffes & Karen Blixen.</span>")
			.description("This full day tour is an excellent way to begin or end your East Africa safari. Search out wildlife at Nairobi National Park, on the outskirts of Nairobi. Enjoy lunch at a local restaurant and visit the Karen Blixen Museum. Stop by the Giraffe Center for a close up look at the endangered Rothschild giraffes full day Nairobi National Park tour, Baby elephant Giraffes & Karen Blixen Museum Tour in Nairobi.")
			.image("https://picsum.photos/200/300?random="+rand.nextInt(50))
			.price(120.45)
			.build());
		this.repository.save(Safari.builder()
			.title("<span>Mombasa Beach Safari.</span>")
			.description("Seven Days Mombasa Tour")
			.image("https://picsum.photos/200/300?random="+rand.nextInt(50))
			.price(575.00)
			.build());	
		this.repository.save(Safari.builder()
			.title("<span>One Day Lake Nakuru National Park From Nairobi.</span>")
			.description("Lake Nakuru National Park is known as an ornithological paradise by bird-watchers because the lake is world famous as the location of the greatest bird spectacle on earth which boasts anywhere between one and two million lesser and greater pink flamingos that feed on the abundant algae thriving in the lakes warm waters.")
			.image("https://picsum.photos/200/300?random="+rand.nextInt(50))
			.price(200.45)
			.build());
		this.repository.save(Safari.builder()
			.title("<span>Six Day Kilimanjaro Climbing Machame Route Down Mweka.</span>")
			.description("African Home Adventure Ltd has led several groups on an expedition up Mt. Kilimanjaro with clients of different ages and level of experience and if you are interested in climbing Mt. Kilimanjaro with us and would like assistance in acquiring group rates if travelling in a group, please donâ€™t hesitate to contact us. Our sales team will get back to you with a more detailed programs and price quote.")
			.image("https://picsum.photos/200/300?random="+rand.nextInt(50))
			.price(600.45)
			.build());	
		this.repository.save(Safari.builder()
			.title("<span>Five Days Mount Kenya Climb and Adventure.</span>")
			.description("This creative climb is one of the most popular African trekking tours. It joins two of the most scenic routes up Mount Kenya, Sirimon and Chogoria, producing a remarkably diverse and spectacular trek. Sirimon coming off the west of Mount Kenya passes through the dry side of the mountain with its giant trees and rocky terrain, and the descent onto the Chogoria path is exactly different with its lush bamboo and highland forests. The final night time ascent of Point Lenana can be as difficult as any ascent in East Africa, but the rest of the trek is generally considered easier than either Kilimanjaro or the Rwenzoris, and this is the most likely climb for actually seeing big game. Accommodation on this hike is in mountain huts. Nonetheless, if you prefer to camp you can do so on all nights on the mountain.")
			.image("https://picsum.photos/200/300?random="+rand.nextInt(50))
			.price(4500.45)
			.build());		
    }
}