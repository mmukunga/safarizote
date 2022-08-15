package com.safari.springboot.safarizote.utils;

import com.stripe.Stripe;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.HashMap;
import java.util.Map;

@Component
public class StripeClient {
       
    @Value("${stripe.public.key}")
    private String stripePublicKey;
    
    @Autowired
    StripeClient() {
        System.out.println("1.StripeClient..");
        //process.env.STRIPE_SECRET_KEY
        Stripe.apiKey = "sk_test_51H2LF6K05l6lAIQmB8pBWrOMQJem5ULKpaaS6OF7IG54MUSFT2uyZS8BiTXhZ4abcIi9DYigDyQ5UyUecoaZsPaw00yC0uhQ16";
    }

    public Customer createCustomer(String token, String email) throws Exception {
        System.out.println("2.StripeClient..");
        System.out.println("3.StripeClient..");
        Map<String, Object> customerParams = new HashMap<String, Object>();
        customerParams.put("email", email);
        customerParams.put("source", token);
        System.out.println("4.StripeClient..");
        return Customer.create(customerParams);
    }

    private Customer getCustomer(String id) throws Exception {
        return Customer.retrieve(id);
    }

    public Charge chargeNewCard(String token, double amount) throws Exception {
        System.out.println("5a.StripeClient..");
        System.out.println("5b.StripeClient..token:  " + token);
        System.out.println("5c.StripeClient..amount: " + amount);
        System.out.println("5d.StripeClient..");
        Map<String, Object> chargeParams = new HashMap<String, Object>();
        System.out.println("6.StripeClient..");
        chargeParams.put("amount", (int)(amount * 100));
        chargeParams.put("currency", "USD");
        chargeParams.put("source", token);
        System.out.println("7.StripeClient..");
        Charge charge = Charge.create(chargeParams);
        System.out.println("8.StripeClient..");
        return charge;
    }
    public Charge chargeCustomerCard(String customerId, int amount) throws Exception {
        System.out.println("9.StripeClient..");
        String sourceCard = getCustomer(customerId).getDefaultSource();
        System.out.println("10.StripeClient..");
        Map<String, Object> chargeParams = new HashMap<String, Object>();
        System.out.println("11.StripeClient..");
        chargeParams.put("amount", amount);
        chargeParams.put("currency", "USD");
        chargeParams.put("customer", customerId);
        chargeParams.put("source", sourceCard);
        System.out.println("12.StripeClient..");
        Charge charge = Charge.create(chargeParams);
        System.out.println("13.StripeClient..");
        return charge;
    }
}