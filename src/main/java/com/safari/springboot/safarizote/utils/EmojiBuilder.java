package com.safari.springboot.safarizote.utils;

import com.safari.springboot.safarizote.model.Emoji;
import com.safari.springboot.safarizote.repository.EmojiRepository;

import java.util.ArrayList;
import java.util.List;

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

      List<Emoji> list = new ArrayList<>();
      list.add(Emoji.builder()
      .name("busstop").label("Stop").svgUrl("").build());
      list.add(Emoji.builder()
      .name("Safaris").label("house").svgUrl("").build());
      list.add(Emoji.builder()
      .name("Contact Us").label("email").svgUrl("").build());
      list.add(Emoji.builder()
      .name("Name").label("information_desk_person").svgUrl("").build());
      list.add(Emoji.builder()
      .name("Email").label("email").svgUrl("").build());
      list.add(Emoji.builder()
      .name("Phone").label("phone").svgUrl("").build());
      list.add(Emoji.builder()
      .name("About Us").label("information_source").svgUrl("").build());
      list.add(Emoji.builder()
      .name("Cart").label("shopping_cart").svgUrl("").build());
      list.add(Emoji.builder()
      .name("Weather").label("sun_behind_large_cloud").svgUrl("").build());
      list.add(Emoji.builder()
      .name("Login").label("lock").svgUrl("").build());
      list.add(Emoji.builder()
      .name("Name").label("united_arab_emirates").svgUrl("").build());
      list.add(Emoji.builder()
      .name("Password").label("closed_lock_with_key").svgUrl("").build());
      list.add(Emoji.builder()
      .name("Select").label("chart").svgUrl("").build());
      list.add(Emoji.builder()
      .name("Tipping").label("currency_exchange").svgUrl("").build());
      list.add(Emoji.builder()
      .name("Shopping").label("Shopping").svgUrl("").build());
      list.add(Emoji.builder()
      .name("Stock Market").label("chart_with_upwards_trend").svgUrl("").build());
      list.add(Emoji.builder()
      .name("Backup").label("minidisc").svgUrl("").build());
      list.add(Emoji.builder()
      .name("Errors").label(" warning").svgUrl("").build());
      list.add(Emoji.builder()
      .name("Add").label("heavy_plus_sign").svgUrl("").build());
      list.add(Emoji.builder()
      .name("Remove").label("heavy_minus_sign").svgUrl("").build());
      list.add(Emoji.builder()
      .name("Delete").label("information_source").svgUrl("").build());
      
      repository.saveAll(list);
    }   
}