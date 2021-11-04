package com.example.safarizote.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.example.safarizote.model.Booking;
import com.example.safarizote.model.Safari;
import com.example.safarizote.repository.CartRepository;

@Component
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository repository;

    private Map<Long, Safari> catalog;

    @Value("${contactEmail}")
    private String contactEmail;

    @Value("${safaris.salesTaxRate}")
    private double salesTaxRate;

    @Value("${safaris.deliveryCharge.normal}")
    private double standardDeliveryCharge;

    @Value("${safaris.deliveryCharge.threshold}")
    private double deliveryChargeThreshold;

    public String getContactEmail() {
        return contactEmail;
    }

   public void setCatalog(Map<Long, Safari> _catalog){
       catalog = _catalog;
   }

    public void addItemToCart(Booking booking) {
        repository.save(booking);
    }

    public void removeItemFromCart(Booking booking) {
            repository.delete(booking);
    }

    public List<Booking> getAllItemsInCart() {
        return repository.findAll();
    }

    public Double calculateCartCost() {
        return 0.0;
    }
}
