package com.example.safarizote.utils;

import java.util.Map;

import com.example.safarizote.model.Safari;

public interface CartService {
    void setCatalog(Map<Integer, Safari> _catalog);
    void addItemToCart(int id, int quantity);
    void removeItemFromCart(int id);
    Map<Integer, Integer> getAllItemsInCart();
    double calculateCartCost();
    double calculateSalesTax();
    double calculateDeliveryCharge();
}
