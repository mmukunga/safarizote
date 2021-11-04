package com.example.safarizote.controller;

import java.net.UnknownHostException;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.safarizote.model.Booking;
import com.example.safarizote.model.Email;
import com.example.safarizote.model.Safari;
import com.example.safarizote.repository.CartRepository;
import com.example.safarizote.repository.SafariRepository;
import com.example.safarizote.utils.CartService;
import com.example.safarizote.utils.IEmailService;

@RestController
public class HomeController { 
  @Autowired
  private SafariRepository repository;

  @Autowired
  private CartRepository cartRepository;

  private Map<Long, Safari> catalog = new HashMap<>();

  @Autowired
	private CartService service;
  
  @Autowired
  private IEmailService emailService;

  @GetMapping(value = "/api/safaris")
  public ResponseEntity<List<Safari>> findSafaris(){
    List<Safari> sourceSet = repository.findAll();

    sourceSet.forEach(safari -> {
      Long Id = Long.valueOf(safari.getId().longValue());
      catalog.put(Id, safari);
    });

    service.setCatalog(catalog);
    return ResponseEntity.ok().body(sourceSet);
  }

  @RequestMapping("/api/addToCart?id={id}&quantity={quantity}")
  public ResponseEntity<Collection<Booking>> addItemToCart(@RequestBody Booking booking) {
      if (booking.getId() != null) {
        service.addItemToCart(booking);
        System.out.println(String.format("Added to cart: %s [x%d]", catalog.get(booking.getId()).getSummary(), booking.getAdults()));
      }
      return getAllItems();
  }

  @GetMapping(value="/api/showCart", produces={"application/json","application/xml"})
  public ResponseEntity<Collection<Booking>> getAllItems() {
    List<Booking> cart = service.getAllItemsInCart();

    if (cart == null) {
        return ResponseEntity.notFound().build();
    } else {
        return ResponseEntity.ok().body(cart);
    }          
  }

  @RequestMapping("/api/removeFromCart")
  public ResponseEntity<Collection<Booking>> removeItemFromCart(@RequestBody Booking booking) {
      if (booking.getId() != null) {
      service.removeItemFromCart(booking);
      }
      return getAllItems();
  }

  @GetMapping(value="/api/cartCost", produces={"application/json","application/xml"})
  public ResponseEntity<Double> getCartCost() {
    return ResponseEntity.ok().body(service.calculateCartCost());
  }

  @PostMapping(value="/api/booking", produces={"application/json","application/xml"})
  public ResponseEntity<Double> sendBooking(@RequestBody List<Booking> cart) throws MailException, UnknownHostException {
    System.out.println("1.Booking STARTED!!");
    for (Booking booking : cart) {
      System.out.println(booking);
    }
    System.out.println("2. Booking STARTED!!");

    for (Booking booking : cart) {
      System.out.println(booking);
      cartRepository.save(booking);   
      System.out.println(booking);

      StringBuffer buffer = new StringBuffer();
      buffer.append(booking.getAddress())
        .append("\t" + booking.getAdults())
        .append("\t" + booking.getChildren())
        .append("\t" + booking.getMessage());

      Email email = Email.builder()
        .safariId(booking.getId())
        .name(booking.getName())
        .email(booking.getEmail())
        .dateCreated(booking.getDate())
        .phone(booking.getPhone())
        .message(buffer.toString())
        .build();

      emailService.sendEmail(email);
    }
    return ResponseEntity.ok().body(service.calculateCartCost());
  }
}