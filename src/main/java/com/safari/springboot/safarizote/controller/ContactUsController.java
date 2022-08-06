package com.safari.springboot.safarizote.controller;

import java.io.IOException;
import java.util.List;

import javax.mail.MessagingException;

import com.safari.springboot.safarizote.model.ContactUs;
import com.safari.springboot.safarizote.repository.ContactUsRepository;
import com.safari.springboot.safarizote.utils.EMailSenderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class ContactUsController {
    @Autowired
    private EMailSenderService senderService;


    @Autowired
    private ContactUsRepository repository;

    @RequestMapping(value="/api/contactUs", method=RequestMethod.GET)
    public ResponseEntity<List<ContactUs>> getContact() {
        List<ContactUs> contacts = this.repository.findAll();
        return new ResponseEntity<>(contacts, HttpStatus.OK);
    }

    @RequestMapping(value="/api/sendMessage", method=RequestMethod.POST)
    public ResponseEntity<ContactUs> sendMessage(@RequestBody ContactUs contactUs) throws MessagingException {
        System.out.println(contactUs);
        ContactUs contactMessage = this.repository.save(contactUs);
        try {
            senderService.sendEmailWithAttachment(contactUs);
        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(contactMessage, HttpStatus.OK);
    }
}