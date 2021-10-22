package com.example.safarizote.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import com.example.safarizote.model.Safari;
import com.example.safarizote.repository.CartRepository;

@Component
public class CartServiceImpl implements CartService, CommandLineRunner {

    @Autowired
    private CartRepository repository;

    @Value("#{catalog}")
    private Map<Integer, Safari> catalog;

    @Value("${contactEmail}")
    private String contactEmail;

    @Value("${safaris.salesTaxRate}")
    private double salesTaxRate;

    @Value("${safaris.deliveryCharge.normal}")
    private double standardDeliveryCharge;

    @Value("${safaris.deliveryCharge.threshold}")
    private double deliveryChargeThreshold;


    @Override
    public void run(String... args) throws Exception {
        catalog = new HashMap<>();
        catalog.put(0, Safari.builder().id(0L).title("3 days Masai Mara").details("Masai Mara").summary("Mara by Car").price(2499.99).dateCreated(Instant.now()).build());
        catalog.put(1, Safari.builder().id(1L).title("One day Nairobi City Tour").details("Nairobi City").summary("Ngong Karen Etc..").price(15.99).dateCreated(Instant.now()).build());
        catalog.put(2, Safari.builder().id(2L).title("Two days Amboseli").details("Amboseli and Tsavo").summary("Amboseli").price(1800.99).dateCreated(Instant.now()).build());
        catalog.put(3, Safari.builder().id(3L).title("Mount Kenya 5 Days").details("Mount Kenya").summary("Mount Kenya").price(10.59).dateCreated(Instant.now()).build());
        catalog.put(4, Safari.builder().id(4L).title("Kilimanjaro 6 days").details("Kilimanjaro").summary("Kilimanjaro").price(200.59).dateCreated(Instant.now()).build());
        catalog.put(5, Safari.builder().id(5L).title("Lake Nakuru").details("Lake Nakuru").summary("Lake Nakuru").price(159.99).dateCreated(Instant.now()).build());
    }    


    public String getContactEmail() {
        return contactEmail;
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
