package com.safari.springboot.safarizote.controller;

import com.safari.springboot.safarizote.model.Customer;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @RequestMapping(value = "/api/login", method = RequestMethod.POST)
    public ResponseEntity<Customer> login(@RequestBody Customer user) {
        String email = "mkunsim@gmail.com";
        String pwd = "Thufili002";
        Customer dbuser = Customer.builder().email(email).password(pwd).build();
        return new ResponseEntity<>(dbuser, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/logout", method = RequestMethod.POST)
    public ResponseEntity<String> logout() throws Exception {
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/validate", method = RequestMethod.POST)
    public ResponseEntity<?> validate(@RequestBody String pwd) {
        System.out.println("pwd: " +  pwd);
        Boolean isValid = true;
        if (pwd.length() <= 6 || pwd.length() >= 20){
                isValid = false;
        }

        String upperCaseChars = "(.*[A-Z].*)";
        if (!pwd.matches(upperCaseChars )) {
                isValid = false;
        }

        String lowerCaseChars = "(.*[a-z].*)";
        if (!pwd.matches(lowerCaseChars )) {
                isValid = false;
        }

        String numbers = "(.*[0-9].*)";
        if (!pwd.matches(numbers )) {
                isValid = false;
        }
        String specialChars = "(.*[@,#,$,%].*$)";
        if (!pwd.matches(specialChars )) {
                isValid = false;
        }

        if (!isValid) {
            System.out.println("NOT VALID!! pwd: " +  pwd);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        System.out.println("VALID!! pwd: " +  pwd);
        return new ResponseEntity<Boolean>(HttpStatus.OK);
    }
}
