package com.safari.springboot.safarizote.controller;

import com.safari.springboot.safarizote.utils.StripeClient;
import com.stripe.model.Charge;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
public class PaymentController {
    @Value("${stripe.public.key}")
    private String stripePublicKey;
    
    @Autowired
    private StripeClient stripeClient;
    
    @PostMapping("/api/payment/charge")
    public Charge chargeCard(@RequestBody Map<String, Object> payLoad) throws Exception {
            System.out.println("chargeCard amount: " + payLoad);
            String tokenId = payLoad.get("token").toString();
            String currency = payLoad.get("currency").toString();
            String price = payLoad.get("price").toString();
            System.out.println("1.chargeCard tokenId: " + tokenId);
            System.out.println("2.chargeCard currency: " + currency);
            System.out.println("3.chargeCard price: " + price);
            System.out.println("200ZZZ.stripePublicKey");
            System.out.println(stripePublicKey);
            String token = (String)payLoad.get("token");
            
            Double amount = Double.parseDouble(price);
            System.out.println("4.chargeCard token: "  + token);
            System.out.println("5.chargeCard amount: " + amount);
            System.out.println("300 YYY.stripePublicKey");
            System.out.println(stripePublicKey);

        return this.stripeClient.chargeNewCard(token, amount);
    }

    
    public void setStripePublicKey(String stripePublicKey) {
        this.stripePublicKey = stripePublicKey;
    }

}