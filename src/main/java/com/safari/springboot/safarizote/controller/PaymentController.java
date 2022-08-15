package com.safari.springboot.safarizote.controller;

import com.safari.springboot.safarizote.utils.StripeClient;
import com.stripe.model.Charge;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class PaymentController {
        
    private StripeClient stripeClient;
    @Autowired
    PaymentController(StripeClient stripeClient) {
        this.stripeClient = stripeClient;
    }

    @PostMapping("/api/payment/charge")
    public Charge chargeCard(@RequestBody Map<String, Object> payLoad) throws Exception {
            System.out.println("chargeCard amount: " + payLoad);
            String tokenId = payLoad.get("token").toString();
            String price = payLoad.get("amount").toString();
            System.out.println("1.chargeCard tokenId: " + tokenId);
            System.out.println("2.chargeCard price: " + price);

            String token = (String)payLoad.get("token");
            //Integer amount2 = Integer.parseInt(price);
            Double amount = Double.parseDouble(price);
            System.out.println("1.chargeCard token: "  + token);
            System.out.println("2.chargeCard amount: " + amount);
        return this.stripeClient.chargeNewCard(token, amount);
    }


    /* @PostMapping("/api/payment/charge")
    public Charge chargeCard(@RequestHeader(value="token") String token, 
        @RequestHeader(value="currency") String currency,
        @RequestHeader(value="amount") Double amount) throws Exception {
            System.out.println("chargeCard amount: " + amount);
        return this.stripeClient.chargeNewCard(token, amount);
    }*/
}