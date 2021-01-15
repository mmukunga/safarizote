package com.example.safarizote.utils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements IEmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);
    @Autowired
    private JavaMailSender javaMailSender;
    
    @Override
    public void sendEmail() {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo("to_1@gmail.com", "to_2@gmail.com", "to_3@yahoo.com");

        msg.setSubject("Testing from Spring Boot");
        msg.setText("Hello World \n Spring Boot Email");

        javaMailSender.send(msg);

    }

    @Override
    public void sendEmailWithAttachment() throws MessagingException {
        logger.info("Sending email with attachment start");

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        // Set multipart mime message true
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage,
                true);

        mimeMessageHelper.setTo("santosh@example.com");
        mimeMessageHelper
                .setSubject("Spring Boot=> Sending email with attachment");
        mimeMessageHelper.setText(
                "Dear Santosh, I have sent you Websparrow.org new logo. PFA.");

        // Attach the attachment
        mimeMessageHelper.addAttachment("logo.png",
                new ClassPathResource("logo-100.png"));

        javaMailSender.send(mimeMessage);


		logger.info("Email with attachment sent");

    }

    @Override
    public void sendHTMLEmail() {
        logger.info("HTML email sending start");
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
    }
}