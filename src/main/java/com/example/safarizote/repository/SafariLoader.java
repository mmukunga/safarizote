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
            .title("3 Days Masai Mara Safari - Nairobi")
            .price(450.00)
            .summary("<p>The Masai Mara reserve will tickle your thrill spot with Kenya’s richest concentration of wildlife. The lush golden grassland plains are filled with plentiful zebras, lions and wild beasts, with a real-life alacrity of on-camera safari expeditions.This acacia land brings you goosebumps with the cheerful sight of the five giants, the elephants, rhinos, lions, leopards and the wild buffaloes. Feel the intriguing sense of nomadic life with captivating day-time activities and splendid overnight stays at camps or lodges on this trip to Masai Mara.</p>")
            .details("<div class='SafariDetails'><p>Below are the details for the 3 Day Masaai Mara Safari:</p><p><strong>DAY 1: NAIROBI – MASAI MARA</strong></p> <p>Pick up from Airport of Place of Residence in Nairobi at 7:00am, Your safari takes you to the Maasai Mara Reserve and into the domain of the Maasai, Kenya’s cattle-herding nomads determined to preserve their traditions. Arrival in Masai Mara in time for lunch, after lunch embark on an evening Game drive until Late evening when you settle for dinner and overnight. accommodation overnight at either Mara Sopa Lodge, Mara Serena Safari Lodge, Ashnil Mara Tented Camp or Mara Sarova Game Camp</p><p><strong>DAY 2: MASAI MARA</strong></p> <p>Spend the day in Masai Mara, Kenya’s most popular game reserve where you will have the best opportunity of spotting the Big Five – lion, leopard, buffalo, rhino and elephant, Game drives are flexible, with the option of going out with picnic lunch boxes to spend entire day in the park, or you can choose to have early morning and late afternoon game drives. You will also have the option of visiting a local Masai village (at a cost of US$20 per person).</p> <p>All meals and overnight at either Mara Sopa Lodge, Mara Serena Safari Lodge, Ashnil Mara Tented Camp or Mara Sarova Game Camp</p> <p><strong>DAY 3: Masai Mara National Reserve – Nairobi</strong></p> <p>Early Morning breakfast at your camp check out of the camp and park and drive to Nairobi arriving in time for lunch. Lunch at carnivore afterwards drop off at your respective hotel or airport at 3:30 PM.</p> </div>")
            .dateCreated(Instant.now())
            .build());

        repository.save(Safari.builder()
            .title("1 Full day tour Nairobi National Park, Elephant Center-Giraffes & Karen Blixen")
            .price(150.00)
            .summary("<p>This full day tour is an excellent way to begin or end your East Africa safari. Search out wildlife at Nairobi National Park, on the outskirts of Nairobi. Enjoy lunch at a local restaurant and visit the Karen Blixen Museum. Stop by the Giraffe Center for a close up look at the endangered Rothschild giraffes full day Nairobi National Park tour, Baby elephant Giraffes & Karen Blixen Museum Tour in Nairobi.</p>")
            .details("<div class='SafariDetails'>Nairobi National Game Park is a unique ecosystem by being the only protected area in the world close to a capital city. Located just 7kms from Nairobi’s city centre, Nairobi National Park is the perfect place for a half-day or full day excursion or Tour from the Kenyan capital. One of the only places on earth where you can be on safari with skyscrapers as part of your backdrop, it’s an ideal layover escape or add-on to your existing safari.<p><strong>Important Details</strong></p> Included <ul><li>Safari van with open roof</li><li>pickup and Drop off-Nairobi Hotel/Apartment/Airport</li><li>Driver Guide</li></ul> Not Included <ul><li>Admission fees park $43,<br/>Elephant$5,<br/>Giraffe $15,<br/>Karen $13</li><li>Gratuities</li><li>Lunch</li></ul> Additional Info <ul><li>Public transportation options are available nearby</li><li>Suitable for all physical fitness levels</li></ul> Meeting Point <p> We will pick up and drop off At any Nairobi Hotel/Apartment/Airport</p></div>")
            .dateCreated(Instant.now())
            .build());

        repository.save(Safari.builder()
            .title("3 Days Safari from Nairobi to Amboseli and Tsavo East ending in Mombasa")
            .price(500.00)
            .summary("<p>This is a 3 Days Safari from Nairobi to Amboseli National Park which is located at the foot of Mount Kilimanjaro – Africa’s highest mountain. Amboseli offers excellent opportunities to view Kenya’s animals, make it one of the most-visited safari parks in Kenya.</p>")
            .details("<div class='SafariDetails'><p><strong>Day 1: Nairobi to Amboseli</strong></p> <p>Depart from Nairobi in the morning and drive to Amboseli National Park to enjoy game viewing up to lunch time at your pre-booked Safari Camp or Lodge. Afternoon game drive follows after a short rest to see Elephants, lions, cheetahs, gazelles, wildebeests, buffalos zebras, warthogs, different birds and of course Mount Kilimanjaro. Dinner and overnight at the Safari Camp or Lodge.</p> <p><strong>Day 2: Amboseli Park - Tsavo East</strong></p> <p>After breakfast we will go for a morning game drive looking out for different wild animals and bird species then exit the park and drive to Tsavo East National Park with game viewing en-route arriving in time for lunch at your pre-booked Safari Camp or Lodge. Afternoon game drive to explore Tsavo East - Kenya's largest National Park. Dinner and overnight at your pre-booked Safari Camp or Lodge.</p>  <p><strong>Day 3: Tsavo East National Park to Mombasa</strong></p> <p>Pre and after breakfast game drive looking for animals. Later on game drive en-route as you leave the parkand drive to Mombasa arriving in the afternoon</p></div>")
            .dateCreated(Instant.now())
            .build());
        
        repository.save(Safari.builder()
            .title("1 Day Lake Nakuru National Park From Nairobi")
            .price(175.00)
            .summary("<p>Lake Nakuru National Park is known as an ornithological paradise by bird-watchers because the lake is world famous as the location of the greatest bird spectacle on earth which boasts anywhere between one and two million lesser and greater pink flamingos that feed on the abundant algae thriving in the lakes warm waters.</p>")
            .details("<div class='SafariDetails'><p>A day trip to Lake Nakuru National park offers a well worth while wildlife experience. The park boasts a large population of Rhino, Lion, Giraffe, Buffalo, Leopard, Water buck as well as many other species of game.</p> <p>In addition the highlight of Lake Nakuru is its mass of Greater and Lessor Flamingo’s which can be found feeding in the shallows of the lake. Also one of the most promising park to see rhino and leopard This is a daily excursion safari.</p><p>Lake Nakuru National Park is known as an ornithological paradise by bird-watchers because the lake is world famous as the location of the greatest bird spectacle on earth which boasts anywhere between one and two million lesser and greater pink flamingos that feed on the abundant algae thriving in the lakes warm waters.</p> <p>A day trip to Lake Nakuru National park offers a well worth while wildlife experience. The park boasts a large population of Rhino, Lion, Giraffe, Buffalo, Leopard, Water buck as well as many other species of game.</p> <p>In addition the highlight of Lake Nakuru is its mass of Greater and Lessor Flamingo’s which can be found feeding in the shallows of the lake. Also one of the most promising park to see rhino and leopard This is a daily excursion safari.</p> <ul><li><strong>0700 HOURS</strong><br/>- Pick up from Your hotel in Nairobi<br/> - Drive to Lake Nakuru National Park</li><li><strong>1000 HOURS</strong> Arrive and enter the Nairobi National Park Game Drives</li><li><strong>1200 HOURS</strong> Drive to a lodge inside the lodge for lunch</li><li><strong>1430 HOURS</strong> Further game drive in the park</li>	<li><strong>1600 HOURS</strong> Depart for Nairobi</li></ul></div>")
            .dateCreated(Instant.now())
            .build());

        repository.save(Safari.builder()
            .title("6 Day Kilimanjaro Climbing Machame Route Down Mweka")
            .price(1450.00)
            .summary("<p>African Home Adventure Ltd has led several groups on an expedition up Mt. Kilimanjaro with clients of different ages and level of experience and if you are interested in climbing Mt. Kilimanjaro with us and would like assistance in acquiring group rates if travelling in a group, please don’t hesitate to contact us.</p>")
            .details("<div class='SafariDetails'><p>Our sales team will get back to you with a more detailed programs and price quote.</p><p><strong>Day 1 : Arusha- Machame Gate to Machame Hut (9,300’)</strong></p> <p>Hike time: 7.5 hrs,</p>Pick up from your Hotel in Arusha at 8.00 am for an early start to Kilimanjaro National Park, once we reach the Machame park gate we will proceed directly to Machame hut campsite Elevation change: +1200 M Estimated distance: 10km, Final elevation: 3100 M, From the gate, we begin our trek following an easy track for the first hour through the dense forest. The path continues to follow the ridge, rising steadily with several steep sections. The gradient eases slightly as the forest merges into heather covered ground we will reach Machame Hut in 10 km (6.2 miles) after a 1,200-meter (3,936’) ascent and 5-7 hours of walking.</p><p><strong>Day 2: Machame Hut to Shira Hut (12,300’)</strong></p> <p>Hike time: 7 hrs, Elevation change: +800 M, estimated distance: 6km, Final elevation: 3800 M, From the Machame Hut we cross the stream onto its west bank and follow the path up the steep rocky ridge crises-crossing a few times before reaching Shira Hut at the base of a semi-circular wall of rocks. We will have ascended 900 meters (3,000’) in 5-7 hours and about 6 km (3.72 miles) of walking.</p><p><strong>Day 3: Shira Hut to Barranco Hut (12,800’)</strong></p><p>Hike time: 5 hrs, Elevation change: +100 M Estimated distance: Final elevation: 3900 M, From Shira Hut hike to Lava Tower (15,000’) and then proceed to Barranco via the Great Barranco Wall. This route offers panoramic views of Kibo through Karanga Valley as we hike high and sleep low, dropping back down to Barranco after lunch. Today’s hike will take most of the day Barranco campsite located on elevation of 3950m.</p><p><strong>Day 4: Barranco Hut to Karanga Valley (14,800’), Hike time: 3.5 hrs, Elevation change: +100 M, Estimated distance: 4km, Maximum elevation: 4590 M, Final elevation: 4000 M From Barranco Hut we climb up through the edge of great Barranco 95percentage of that day walking will be on elevation of 4250m. We will break our day at Karanga valley campsite at elevation of 4,000m walking time is 4 to 5 hrs on this day.</p><p><strong>Day 5: Karanga Valley to Barafu Hut (4,600m)</strong></p> <p>Hike time: 3.5 hrs, Elevation change: +600 M, Estimated distance: 4km, Final elevation: 4600 M, Today involves gaining a little more elevation, acclimatizing and resting for the summit attempt the next morning. This day will take us 4 to 6 hrs of walking. SUMMIT DAY! Summit time: 7 hrs, Elevation change: +1300 M, Estimated distance: 5km, Final elevation: 5895 M</p><p>Descent time: 5 hrs, Elevation change: -2800M, Estimated distance: 12km, Final elevation: 3100 M, We will start trekking early before sunrise (1-2 am) as the walk today will take 10-14 + hours. We will avoid the mist that sets in later in the day; the scree and snow will still be safely frozen. The 1,100-meter (3,600’) ascent in just over 3 km (1.86 miles) will take us about 6-8 hours. After a brief stay at the summit of the highest point in Africa, Uhuru Peak, at over 5,898 meters (19,340'), we descend via the Barafu Route roughly 2,500 meters (8,200’) in 12 km (7.44 miles) in about 4-7 hours to Mweka Camp.</p><p><strong>Day 6: Mweka Hut to Mweka Gate (6,000’)</strong></p> <p>Descent time: 4 hrs, Elevation change: -1250M, Estimated distance: 10km, Final elevation: 1828 M, Today we descend about 1400 meters (4,592’) through the forest on a jungle path for about 10 km (6.2 miles) in 3-4 hours to reach Mweka Gate for transfer to Arusha.</p>WHAT’S INCLUDED.<ul><li>Park entrance fee</li><li>Full board accommodation on the mountain in tents or huts</li><li>Service of our English speaking mountain guide</li><li>Return transport to the mountain</li><li>Any applicable taxes</li> <li>Potters/Cooks</li><li>All mountain rescue fees</li></ul>EXCLUDED:<ul><li>International flight</li><li>Sleeping bag where applicable</li><li>Visa entry into Kenya or Tanzania</li><li>Tips to /cooks porters and guides</li><li>All your climbing gears</li></ul></div>")
            .dateCreated(Instant.now())
            .build());

        repository.save(Safari.builder()
            .title("5 Days Mt. Kenya Hike Safari Tour Sirimon – Chogoria Route")
            .price(945.00)
            .summary("<p>This creative climb is one of the most popular African trekking tours. It joins two of the most scenic routes up Mount Kenya, Sirimon and Chogoria, producing a remarkably diverse and spectacular trek. Sirimon coming off the west of Mount Kenya passes through the dry side of the mountain with its giant trees and rocky terrain, and the descent onto the Chogoria path is exactly different with its lush bamboo and highland forests. The final night time ascent of Point Lenana can be as difficult as any ascent in East Africa, but the rest of the trek is generally considered easier than either Kilimanjaro or the Rwenzoris, and this is the most likely climb for actually seeing big game. Accommodation on this hike is in mountain huts. Nonetheless, if you prefer to camp you can do so on all nights on the mountain.</p>")
            .details("<div class='SafariDetails'>ITINERARY <p><strong>Day one: Nairobi – Nanyuki</strong></p><p>Pick up 0600hrs from our Hotels, and depart for a two and half hour drive to Nanyuki Town. A town at the slopes of Mt. Kenya. on arrival to Nanyuki town at about 1000hrs, we shall have an early lunch and later on proceed to Sirimon Park Gate, where our Mt. Kenya Trek Safari starts. We shall have our Overnight at Old Mosses about 3000m above sea level.</p><p><strong>Day Two: Trekking Mt. Kenya</strong></p><p>Our Trek will begin at 0800hrs after breakfast. This will be a true test to our endurance, patience, and determination while to try to Ascend Sirimon Track. We shall climb out of the North Valley into Mackinder Valley with Giant groundsels. By end of the day, we shall set up camp at Shiptons Cabins below the Main peaks of Batian and Nelion about 4000 m above sea level.</p><p><strong>Day 3: Trekking Mt. Kenya (Acclimatisation)</strong></p><p>We shall spend this day acclimatizing with the climate around.  we shall climb to the viewpoint at Oblang and Nanyuki tarn.  We shall have an excellent view of Batian and Nelion peaks on this side of the viewpoint.</p><p><strong>Day 4: Trekking Mount Kenya</strong></p><p>Trek begins early morning around 0200 – 0300 hrs. On this day our goal is to reach the peak at sunrise being the highest peak Point Lenana about 4985m. This one of the challenging trek around 4 hours of stiff walking to the summit.  We get the chance to see the sunrise and also Mr.Kilimanjaro if the weather is good enough to allow the longest view in the world. We shall then descent back to Austrian Hut and camp there.</p><p><strong>Day 5 Descend Day</strong></p><p>Early morning breakfast and start the descent via the chogoria route. we get the chance to view the beautiful Gorges Valley, with its lakes and then back into the forest. we shall have lunch at chogoria  gate bunkhouse, hot shower and relaxation, then proceed for a 4 hours drive back to our hotels in Nairobi</p><p>Accommodation whilst on Safari (including tents at Mintos Camp)</p><ul><li>All transfers as mentioned above</li><li>Lunch at Nanyuki and the Chogoria exit</li><li>All meals while mountaineering</li><li>Services of a professional guide</li><li>A porter for every guest (guest only to carry own daypack)</li></ul>Excluded from the Price: <ul><li>Beverages and other extras in Nanyuki</li><li>All activities not mentioned above</li><li>Items of personal nature</li><li>Personal insurances covers (including emergency evacuation covers)</li></ul></div>")
            .dateCreated(Instant.now())
            .build());
        
        repository.save(Safari.builder()
            .title("7 Days Kenya Beach Holiday and Amboseli")
            .price(1550.00)
            .summary("<p>Kenya has so much to offer the visitor - from the vast plains of the iconic Masai Mara and Amboseli teeming with wildlife to the white sand beaches of the Indian Ocean</p>")
            .details("<div class='SafariDetails'>Kenya has so much to offer the visitor - from the vast plains of the iconic Masai Mara and Amboseli teeming with wildlife to the white sand beaches of the Indian Ocean.</div>")
            .dateCreated(Instant.now())
            .build());
        
        createBookings();

        repository.findAll().forEach((Safari) -> {
            logger.info("{}", Safari);
        });
    }

    public List<Booking> createBookings() {
        List<Booking> bookings = new ArrayList<>();
        List<Safari> safaris = repository.findAll();
        Safari[] myArray = new Safari[safaris.size()];
        safaris.toArray(myArray);
        Set<Safari> safarisSet = new HashSet<>(safaris);
        int id = (int) ((Math.random() * (myArray.length - 0)) + 0);
        Safari parent = null;
        System.out.println("\n==============> 2. New Enhanced For loop Example..");
        for (Safari safari : safaris) {
            if (safari.getId() == id) {
                System.out.println(parent);
                parent = safari;
            }
        }

        bookings.add(Booking.builder().safaris(safarisSet).name("Jack Maji Moto Smith").email("m@gmail.com").phone("415 22 386").address("21 Jump street").adults("2").children("1").message("Twende Kenya ndugu yangu!!").date(Instant.now()).build());
        bookings.add(Booking.builder().safaris(safarisSet).name("Adam Moto Wake").email("maji@gmail.com").phone("915 22 111").address("Grefsen Platåen").adults("2").children("1").message("Twende Mombasa tukaogelee!!").date(Instant.now()).build());
        bookings.add(Booking.builder().safaris(safarisSet).name("Johnson Katana Ndovu").email("moto@hotmail.com").phone("222 22 222").address("Maridalsveien").adults("2").children("1").message("Twende Safari tukaone wanyama!!").date(Instant.now()).build());
        bookings.add(Booking.builder().safaris(safarisSet).name("Peter Ngara Mwendwa").email("kazi@online.no").phone("911 22 911").address("Number 10").adults("2").children("1").message("Twende Safari tukaone Ndovu!!").date(Instant.now()).build());
        bookings.add(Booking.builder().safaris(safarisSet).name("Masinde Murilo David").email("sverige@kora.se").phone("+44 510 22 777").address("Downings Street").adults("2").children("1").message("Twende Safari tukaone Simba na wenzake!!").date(Instant.now()).build());
        
        Set<Booking> hSet = new HashSet<Booking>(bookings);

        safaris = repository.findAll(); 
        for (int i = 0; i < safaris.size(); i++) {
            Safari safari = safaris.get(i);
            safari.setBookings(hSet);
            repository.save(safari);
        }

        return bookings;
    }

}