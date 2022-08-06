package com.safari.springboot.safarizote.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.safari.springboot.safarizote.model.ContactUs;

import java.io.IOException;


@Service
public class EMailSenderService {

    @Autowired
    private JavaMailSenderImpl javaMailSender;

    // Use it to send Simple text emails
    public void sendEmail(ContactUs contactUs) {

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo("1@gmail.com", "2@yahoo.com");

        msg.setSubject("Testing from Spring Boot");
        msg.setText("Hello World \n Spring Boot Email\n" + contactUs.getMessage() + "\n");
        
        javaMailSender.setUsername("mkunsim@gmail.com");
        javaMailSender.setPassword("Thufili002");
        javaMailSender.setHost("smtp.gmail.com");
     
        javaMailSender.getSession().getProperties().put("mail.smtp.ssl.trust", "smtp.gmail.com");
        javaMailSender.getSession().getProperties().put("mail.smtp.starttls.enable", true);
    
        javaMailSender.getSession().getProperties().put("mail.transport.protocol", "smtp");
        javaMailSender.getSession().getProperties().put("mail.smtp.port", 587);
        javaMailSender.getSession().getProperties().put("mail.smtp.auth", true);
        javaMailSender.getSession().getProperties().put("mail.smtp.starttls.enable", true);
        javaMailSender.getSession().getProperties().put("mail.smtp.ssl.enable", false);
        javaMailSender.getSession().getProperties().put("mail.smtp.starttls.required", true);
        javaMailSender.getSession().getProperties().put("mail.smtp.ssl.trust", "smtp.gmail.com");

        javaMailSender.send(msg);

    }


    public void sendEmailWithAttachment(ContactUs contactUs) throws MessagingException, IOException {
        MimeMessage msg = javaMailSender.createMimeMessage();
        // true = multipart message
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
        helper.setTo("mkunsim@gmail.com");
        helper.setFrom(contactUs.getEmail());
        helper.setText(contactUs.getName());
        helper.setSubject("Testing from Spring Boot");
        helper.setText("<h1>Check attachment for image!</h1> <p>" + contactUs.getMessage() + " </p>", true);
        helper.addAttachment("my_photo.png", new ClassPathResource("android.png"));
        javaMailSender.setUsername("mkunsim@gmail.com");
        javaMailSender.setPassword("Thufili002");
        javaMailSender.setHost("smtp.gmail.com");
        javaMailSender.getSession().getProperties().put("mail.smtp.ssl.trust", "smtp.gmail.com");
        javaMailSender.getSession().getProperties().put("mail.smtp.starttls.enable", true);
        javaMailSender.getSession().getProperties().put("mail.transport.protocol", "smtp");
        javaMailSender.getSession().getProperties().put("mail.smtp.port", 587);
        javaMailSender.getSession().getProperties().put("mail.smtp.auth", true);
        javaMailSender.getSession().getProperties().put("mail.smtp.starttls.enable", true);
        javaMailSender.getSession().getProperties().put("mail.smtp.ssl.enable", false);
        javaMailSender.getSession().getProperties().put("mail.smtp.starttls.required", true);
        javaMailSender.getSession().getProperties().put("mail.smtp.ssl.trust", "smtp.gmail.com");
        javaMailSender.send(msg);
    }
}
