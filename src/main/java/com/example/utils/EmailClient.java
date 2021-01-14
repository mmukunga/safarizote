package com.example.utils;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.io.IOException;
import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailClient {

    //@Autowired
    private JavaMailSender javaMailSender;
    
    public EmailClient(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
      }

    public void sendEmail() throws MailException {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo("to_1@gmail.com", "to_2@gmail.com", "to_3@yahoo.com");

        msg.setSubject("Testing from Spring Boot");
        msg.setText("Hello World \n Spring Boot Email");

        javaMailSender().send(msg);

    }

    public void sendEmailWithAttachment() throws MessagingException, IOException {
        MimeMessage msg = javaMailSender.createMimeMessage();

        // true = multipart message
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
        helper.setTo("to_@email");
        helper.setSubject("Testing from Spring Boot");
        // default = text/plain
        //helper.setText("Check attachment for image!");
        // true = text/html
        helper.setText("<h1>Check attachment for image!</h1>", true);
        // hard coded a file path
        //FileSystemResource file = new FileSystemResource(new File("path/android.png"));
        helper.addAttachment("my_photo.png", new ClassPathResource("android.png"));

        javaMailSender.send(msg);
    }

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        mailSender.setUsername("username.gmail.com");
        mailSender.setPassword("password");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }

}
