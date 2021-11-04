package com.example.safarizote.utils;

import java.util.List;
import java.util.Map;

import com.example.safarizote.model.Booking;
import com.example.safarizote.model.Safari;

public interface CartService {
    void setCatalog(Map<Long, Safari> _catalog);
    void addItemToCart(Booking booking);
    void removeItemFromCart(Booking booking);
    List<Booking> getAllItemsInCart();
    Double calculateCartCost();
}
