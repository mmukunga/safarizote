package com.example.safarizote.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.ui.Model;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.safarizote.model.Safari;
import com.example.safarizote.repository.SafariRepository;
import com.example.safarizote.utils.CartService;

@RestController
public class HomeController { 
  @Autowired
  private SafariRepository repository;

  @Autowired
	private Map<Integer, Safari> catalog;

  @Autowired
	private CartService service;
  
  @GetMapping(value = "/api/safaris")
  public ResponseEntity<List<Safari>> findSafaris(){
    List<Safari> sourceSet = repository.findAll();
    return ResponseEntity.ok().body(sourceSet);
  }

  @RequestMapping("/api/addToCart")
  public String addItemToCart(Model model, @RequestParam("id") Integer id, @RequestParam("quantity") Integer quantity) {
      if (id != null && quantity != null) {
      service.addItemToCart(id, quantity);
      model.addAttribute("message", 
                      String.format("Added to cart: %s [x%d]", catalog.get(id).getSummary(), quantity));
      }
      return "catalog";
  }

  @RequestMapping("/api/showCart")
  public String showCart(Model model) {
    model.addAttribute("cart", service.getAllItemsInCart());  
    model.addAttribute("cartCost", String.format("£%.2f", service.calculateCartCost()));
    model.addAttribute("salesTax", String.format("£%.2f", service.calculateSalesTax()));
    model.addAttribute("deliveryCharge", String.format("£%.2f", service.calculateDeliveryCharge()));
    return "cart";
  }

  @RequestMapping("/api/removeFromCart")
  public String removeItemFromCart(Model model, @RequestParam("id") Integer id) {
      if (id != null) {
      service.removeItemFromCart(id);
      }
      return showCart(model);
  }

  @GetMapping(value="/api/cartItems", produces={"application/json","application/xml"})
  public List<Safari> getAllItems() {
    return service.getAllItemsInCart()
              .keySet()
              .stream()
              .map(id -> catalog.get(id))
              .collect(Collectors.toList());
  }

  @GetMapping(value="/api/cartCost", produces={"application/json","application/xml"})
  public double getCartCost() {
    return service.calculateCartCost();
  }

  @GetMapping(value="/api/quantity", produces={"application/json","application/xml"})
  public int getQuantityForItem() {
    Integer quantity = service.getAllItemsInCart().get(0);
    if (quantity != null) {
      return quantity;
    } else {
      return 0;
    }
  }
}