package com.safari.springboot.safarizote.utils;

import com.safari.springboot.safarizote.model.Emoji;
import com.safari.springboot.safarizote.repository.EmojiRepository;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class EmojiBuilder implements CommandLineRunner {
    @Autowired
    private EmojiRepository repository;

    @Override
    public void run(String... args) throws Exception {    
      repository.deleteAll();    
      if (!repository.findAll().isEmpty()){
        return;
      }
      
      String emojisUrl = "https://api.github.com/emojis";
      Map<String, String> hash_map = byStream(emojisUrl);
      //hash_map.put("by_me_coffee", "https://toppng.com/uploads/preview/coffee-png-11552953340zk1jjnd7x0.png");
      hash_map.put("by_me_coffee", "https://toppng.com/uploads/preview/coffee-png-11552953340zk1jjnd7x0.png");
      //https://cdn.buymeacoffee.com/uploads/profile_pictures/default/FF813F/JC.png
      //https://cdn.buymeacoffee.com/uploads/project_updates/2021/08/e70084175a39d63404339e8037fd5ac4.png
      //https://rupieciarnia.net/codepen-images/kawa-2.jpg
      List<Emoji> list = new ArrayList<>();
      list.add(Emoji.builder()
      .name("Stop").label("busstop").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Safaris").label("house").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Contact Us").label("email").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Name").label("information_desk_person").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Email").label("envelope_with_arrow").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Phone").label("phone").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("About Us").label("information_source").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Cart").label("shopping_cart").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Weather").label("sun_behind_large_cloud").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Login").label("lock").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Name").label("united_arab_emirates").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Password").label("closed_lock_with_key").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Select").label("chart").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Tipping").label("currency_exchange").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Shopping").label("Shopping").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Stock Market").label("chart_with_upwards_trend").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Backup").label("minidisc").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Errors").label(" warning").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Send").label("large_orange_diamond").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Add").label("heavy_plus_sign").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Litter").label("put_litter_in_its_place").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Remove").label("heavy_minus_sign").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Delete").label("information_source").svgUrl("").image(null).build());
      list.add(Emoji.builder()
      .name("Coffee").label("by_me_coffee").svgUrl("").image(null).build());

      for (int i = 0; i < list.size(); i++) {
        String label = list.get(i).getLabel();
        String imageUrl = hash_map.get(label);
        if (imageUrl != null) {
          list.get(i).setSvgUrl(imageUrl);
          byte[] img = imageToByte(imageUrl);
          list.get(i).setImage(img);
        }
      }

      repository.saveAll(list);
    }   

    public Map<String, String> byStream(String filePath) throws IOException {
        URL oracle = new URL(filePath);
        BufferedReader in = new BufferedReader( new InputStreamReader(oracle.openStream()));
        Map<String, String> map = new HashMap<>();
        String line;
        while ((line = in.readLine()) != null) {
          String[] split=line.split(",");
          for(int i = 0; i < split.length; i++) {
            String fields = split[i];
            String[] keyValuePair = fields.split(":", 2);
            String key   = keyValuePair[0].substring(1, keyValuePair[0].length() - 1);
            String value = keyValuePair[1].substring(1, keyValuePair[1].length() - 1);
            map.put(key, value);
          }
        }    
        in.close(); 
      return map;
    }

    public byte [] imageToByte(String imageUrl) throws IOException{
      URL url = new URL(imageUrl);
      URLConnection conn = url.openConnection();
      conn.addRequestProperty("User-Agent", "Mozilla");
		  InputStream fis = new BufferedInputStream(conn.getInputStream());    
      ByteArrayOutputStream bos = new ByteArrayOutputStream();
      byte[] buf = new byte[1024];
      int length;

      while ((length = fis.read(buf)) != -1) {
        bos.write(buf, 0, length);
      }

      fis.close();
      bos.close();

      byte[] bytes = bos.toByteArray();
      return bytes;
    }
  }