package com.safari.springboot.safarizote.utils;

import java.util.Random;
import com.safari.springboot.safarizote.model.Safari;
import com.safari.springboot.safarizote.repository.SafariRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import com.google.api.gax.paging.Page;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.safari.springboot.safarizote.model.GcsFolder;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.json.JSONArray;
import org.json.JSONObject;
import com.google.common.collect.Lists;

@Component
public class SafarisBuilder implements CommandLineRunner {
    @Autowired
    private SafariRepository repository;

    @Override
    public void run(String...args) throws Exception {
		
		System.out.println("Application has started");
        if (repository.count() > 0) {
            return;
        }

        String jsonData = "{ \"headers\" : {\"Content-Type\":\"application/json;charset=utf-8\"}," +
		" \"body\" : { \"folder\" : \"2012 MtKenya/\", \"fileNames\" : [\"Java\", \"Scala\", \"Python\"]} }";

        List<GcsFolder> imgUrls = findObjects(jsonData);
        int listSize = imgUrls.size();
        System.out.println("listSize: " + listSize);

        Random rand = new Random();
        this.repository.save( Safari.builder()
		    .name("masaaiMara")
			.title("<span>Three Days Masaai Mara.</span>")
			.description("The Masai Mara reserve will tickle your thrill spot with Kenyaâ€™s richest concentration of wildlife. The lush golden grassland plains are filled with plentiful zebras, lions and wild beasts, with a real-life alacrity of on-camera safari expeditions.This acacia land brings you goosebumps with the cheerful sight of the five giants, the elephants, rhinos, lions, leopards and the wild buffaloes. Feel the intriguing sense of nomadic life with captivating day-time activities and splendid overnight stays at camps or lodges on this trip to Masai Mara.")
			.image(imgUrls.get(rand.nextInt(listSize)).getPath())
			.price(450.00)
			.build());
        this.repository.save(Safari.builder()
		    .name("amboseli")
			.title("<span>Three Days Safari from Nairobi to Amboseli and Tsavo East ending in Mombasa.</span>")
			.description("This is a 3 Days Safari from Nairobi to Amboseli National Park which is located at the foot of Mount Kilimanjaro â€“ Africaâ€™s highest mountain. Amboseli TourCharges excellent opportunities to view Kenyaâ€™s animals, make it one of the most-visited safari parks in Kenya.")
			.image(imgUrls.get(rand.nextInt(listSize)).getPath())
			.price(500.00)
			.build());
        this.repository.save(Safari.builder()
		    .name("nairobi")
			.title("<span>One Full day tour Nairobi National Park, Elephant Center-Giraffes & Karen Blixen.</span>")
			.description("This full day tour is an excellent way to begin or end your East Africa safari. Search out wildlife at Nairobi National Park, on the outskirts of Nairobi. Enjoy lunch at a local restaurant and visit the Karen Blixen Museum. Stop by the Giraffe Center for a close up look at the endangered Rothschild giraffes full day Nairobi National Park tour, Baby elephant Giraffes & Karen Blixen Museum Tour in Nairobi.")
			.image(imgUrls.get(rand.nextInt(listSize)).getPath())
			.price(120.45)
			.build());
		this.repository.save(Safari.builder()
		    .name("mombasa")
			.title("<span>Mombasa Beach Safari.</span>")
			.description("Seven Days Mombasa Tour")
			.image(imgUrls.get(rand.nextInt(listSize)).getPath())
			.price(575.00)
			.build());	
		this.repository.save(Safari.builder()
		    .name("lakeNakuru")
			.title("<span>One Day Lake Nakuru National Park From Nairobi.</span>")
			.description("Lake Nakuru National Park is known as an ornithological paradise by bird-watchers because the lake is world famous as the location of the greatest bird spectacle on earth which boasts anywhere between one and two million lesser and greater pink flamingos that feed on the abundant algae thriving in the lakes warm waters.")
			.image(imgUrls.get(rand.nextInt(listSize)).getPath())
			.price(200.45)
			.build());
		this.repository.save(Safari.builder()
		    .name("kilimanjaro")
			.title("<span>Six Day Kilimanjaro Climbing Machame Route Down Mweka.</span>")
			.description("African Home Adventure Ltd has led several groups on an expedition up Mt. Kilimanjaro with clients of different ages and level of experience and if you are interested in climbing Mt. Kilimanjaro with us and would like assistance in acquiring group rates if travelling in a group, please donâ€™t hesitate to contact us. Our sales team will get back to you with a more detailed programs and price quote.")
			.image(imgUrls.get(rand.nextInt(listSize)).getPath())
			.price(600.45)
			.build());	
		this.repository.save(Safari.builder()
		    .name("mtKenya")
			.title("<span>Five Days Mount Kenya Climb and Adventure.</span>")
			.description("This creative climb is one of the most popular African trekking tours. It joins two of the most scenic routes up Mount Kenya, Sirimon and Chogoria, producing a remarkably diverse and spectacular trek. Sirimon coming off the west of Mount Kenya passes through the dry side of the mountain with its giant trees and rocky terrain, and the descent onto the Chogoria path is exactly different with its lush bamboo and highland forests. The final night time ascent of Point Lenana can be as difficult as any ascent in East Africa, but the rest of the trek is generally considered easier than either Kilimanjaro or the Rwenzoris, and this is the most likely climb for actually seeing big game. Accommodation on this hike is in mountain huts. Nonetheless, if you prefer to camp you can do so on all nights on the mountain.")
			.image(imgUrls.get(rand.nextInt(listSize)).getPath())
			.price(4500.45)
			.build());		
    }

    public List<GcsFolder> findObjects( String folders) throws IOException {
		System.out.println(folders);
		JSONObject jsonObj = new JSONObject(folders);
		JSONObject headers = jsonObj.getJSONObject("headers");
		System.out.println(headers);
		JSONObject jsonBody = jsonObj.getJSONObject("body");
		System.out.println(jsonBody);
		JSONArray fileNames = jsonBody.getJSONArray("fileNames");
		List<String> list = new ArrayList<String>();     
		for (int i=0;i<fileNames.length();i++){ 
		  list.add(fileNames.getString(i));       
		} 
		System.out.println(fileNames);
		String jsonFolder = jsonBody.getString("folder");
	
		String BUCKET_NAME = "sms_familie_album";
		String PROJECT_ID  = "familiealbum-sms";
		Resource resource = new ClassPathResource("credentials.json");
		GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());
		Storage storage = StorageOptions.newBuilder().setProjectId(PROJECT_ID).setCredentials(credentials).build().getService();
		StringBuilder directoryPrefix = new StringBuilder();
		directoryPrefix.append(folders);
	
		Page<Blob> listObjects = storage.list(BUCKET_NAME,
			Storage.BlobListOption.prefix(jsonFolder),
			Storage.BlobListOption.currentDirectory());
	
		List<GcsFolder> imageUrls = new ArrayList<>();
		Iterable<Blob> blobs = listObjects.iterateAll();
        List<Blob> output = Lists.newArrayList(blobs);

		Random r = new Random();
		for  (int i=0; i < 10; i++) {
		    int index = 1 + r.nextInt(683);
			Blob blob = output.get(index);
			URL signedUrl = blob.signUrl(14, TimeUnit.DAYS);
			String imageUrl = signedUrl.toExternalForm();
			GcsFolder obj = new GcsFolder(blob.getName(), imageUrl);
			imageUrls.add(obj);
		} 
		System.out.println("End OK!!");
		return imageUrls;
	  }    
}