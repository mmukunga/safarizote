package com.example.safarizote.utils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.example.safarizote.model.Email;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


import java.io.UnsupportedEncodingException;
 
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;



@Service("mailService")
public class EmailServiceImpl implements IEmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);
    @Autowired
    JavaMailSender mailSender;
 
    @Override
    public void sendEmail(Email email) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
 
        try {
 
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
 
            mimeMessageHelper.setSubject("Matusi");
            mimeMessageHelper.setFrom(new InternetAddress(email.getEmail(), "technicalkeeda.com"));
            mimeMessageHelper.setTo("mkunsim@gmail.com");
            mimeMessageHelper.setText(email.getMessage());
 
            mailSender.send(mimeMessageHelper.getMimeMessage());
 
        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

    }

    @Override
    public void sendEmailWithAttachment() throws MessagingException {
        logger.info("Sending email with attachment start");

		MimeMessage mimeMessage = mailSender.createMimeMessage();

        // Set multipart mime message true
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage,
                true);

        mimeMessageHelper.setTo("mkunsim@gmail.com");
        mimeMessageHelper
                .setSubject("Spring Boot=> Sending email with attachment");
        mimeMessageHelper.setText(
                "Dear Santosh, I have sent you Websparrow.org new logo. PFA.");

        // Attach the attachment
        mimeMessageHelper.addAttachment("logo.png",
                new ClassPathResource("logo-100.png"));

        mailSender.send(mimeMessage);


		logger.info("Email with attachment sent");

    }

    @Override
    public void sendHTMLEmail() {
        logger.info("HTML email sending start");
		MimeMessage mimeMessage = mailSender.createMimeMessage();
    }
}