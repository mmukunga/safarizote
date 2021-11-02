package com.example.safarizote.controller;

import java.net.UnknownHostException;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.safarizote.model.Booking;
import com.example.safarizote.model.Email;
import com.example.safarizote.model.Safari;
import com.example.safarizote.repository.SafariRepository;
import com.example.safarizote.utils.CartService;
import com.example.safarizote.utils.IEmailService;

@RestController
public class HomeController { 
  @Autowired
  private SafariRepository repository;

  private Map<Integer, Safari> catalog = new HashMap<>();

  @Autowired
	private CartService service;
  
  @Autowired
  private IEmailService emailService;

  @GetMapping(value = "/api/safaris")
  public ResponseEntity<List<Safari>> findSafaris(){
    List<Safari> sourceSet = repository.findAll();

    sourceSet.forEach(safari -> {
      Integer Id = Integer.valueOf(safari.getId().intValue());
      catalog.put(Id, safari);
    });

    service.setCatalog(catalog);
    return ResponseEntity.ok().body(sourceSet);
  }

  @RequestMapping("/api/addToCart?id={id}&quantity={quantity}")
  public ResponseEntity<Collection<Safari>> addItemToCart(@RequestParam Integer id, @RequestParam Integer quantity) {
      if (id != null && quantity != null) {
        service.addItemToCart(id, quantity);
        System.out.println(String.format("Added to cart: %s [x%d]", catalog.get(id).getSummary(), quantity));
      }
      return getAllItems();
  }

  @GetMapping(value="/api/showCart", produces={"application/json","application/xml"})
  public ResponseEntity<Collection<Safari>> getAllItems() {
    List<Safari> cart = service.getAllItemsInCart()
              .keySet()
              .stream()
              .map(id -> catalog.get(id))
              .collect(Collectors.toList());

    if (cart == null) {
        return ResponseEntity.notFound().build();
    } else {
        return ResponseEntity.ok().body(cart);
    }          
  }

  @RequestMapping("/api/removeFromCart/{id}")
  public ResponseEntity<Collection<Safari>> removeItemFromCart(@PathVariable Integer id) {
      if (id != null) {
      service.removeItemFromCart(id);
      }
      return getAllItems();
  }

  @GetMapping(value="/api/cartCost", produces={"application/json","application/xml"})
  public ResponseEntity<Double> getCartCost() {
    return ResponseEntity.ok().body(service.calculateCartCost());
  }

  @GetMapping(value="/api/quantity", produces={"application/json","application/xml"})
  public ResponseEntity<Integer> getQuantityForItem() {
    Integer quantity = service.getAllItemsInCart().get(0);
    if (quantity != null) {
      return ResponseEntity.ok().body(quantity);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping(value="/api/booking", produces={"application/json","application/xml"})
  public ResponseEntity<Double> sendBooking(@RequestParam List<Safari> safaris) throws MailException, UnknownHostException {
    System.out.println("1.Booking STARTED!!");
    for (Safari safari : safaris) {
      System.out.println(safari);
    }
    System.out.println("2. Booking STARTED!!");

    for (Safari safari : safaris) {
      System.out.println(safari);
      repository.save(safari);    
      Set<Booking> bookings = safari.getBookings();
      for (Booking booking : bookings) {
        System.out.println(booking);
        Email email = Email.builder()
        .safariId(booking.getSafariId())
        .name(booking.getName())
        .email(booking.getEmail())
        .dateCreated(booking.getDateCreated())
        .phone(booking.getPhone())
        .message(booking.getMessage())
        .build();
        emailService.sendEmail(email);
      }
    }
    return ResponseEntity.ok().body(service.calculateCartCost());
  }
}