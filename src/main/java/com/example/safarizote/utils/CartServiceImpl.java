package com.example.safarizote.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Map;

import com.example.safarizote.model.Safari;
import com.example.safarizote.repository.CartRepository;

@Component
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository repository;

    private Map<Integer, Safari> catalog;

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

   public void setCatalog(Map<Integer, Safari> _catalog){
       catalog = _catalog;
   }

    public void addItemToCart(int id, int quantity) {
        if (catalog.containsKey(id)) {
            repository.add(id, quantity);
        }
    }

    public void removeItemFromCart(int id) {
        if (catalog.containsKey(id)) {
            repository.remove(id);
        }
    }

    public Map<Integer, Integer> getAllItemsInCart() {
        return repository.getAll();
    }

    public double calculateCartCost() {
        Map<Integer, Integer> items = repository.getAll();

        double totalCost = 0;
        for (Map.Entry<Integer, Integer> item : items.entrySet()) {
            int id = item.getKey();
            int quantity = item.getValue();
            double itemCost = catalog.get(id).getPrice() * quantity;
            totalCost += itemCost;
        }
        return totalCost;
    }

    public double calculateSalesTax() {
        return salesTaxRate * calculateCartCost();
    }

    public double calculateDeliveryCharge() {
        double totalCost = calculateCartCost();
        if (totalCost == 0 || totalCost >= deliveryChargeThreshold) {
            return 0;
        } else {
            return standardDeliveryCharge;
        }
    }
}
