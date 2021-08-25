package com.example.safarizote.utils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.example.safarizote.model.Email;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.UnknownHostException;
import java.util.Properties;

import javax.mail.internet.InternetAddress;

@Service("mailService")
public class EmailServiceImpl implements IEmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

    @Override
    public void sendEmail(Email email) throws MailException, UnknownHostException {
        MimeMessage mimeMessage = getJavaMailSender().createMimeMessage();

        try {

            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setSubject(email.getName());
            mimeMessageHelper.setFrom(new InternetAddress(email.getEmail(), "safarizote.heroku.com"));
            mimeMessageHelper.setTo("mkunsim@gmail.com");
            mimeMessageHelper.setText(email.getMessage());
            
            logger.info(mimeMessageHelper.toString());
            getJavaMailSender().send(mimeMessageHelper.getMimeMessage());

        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

    }

    /*
     * Configure javamail sender with details.
    */
    @Bean
    public JavaMailSender getJavaMailSender() throws UnknownHostException{
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setProtocol("smtp");
        javaMailSender.setHost("smtp.gmail.com");
        javaMailSender.setPort(587);
        javaMailSender.setUsername("mkunsim@gmail.com");
        javaMailSender.setPassword("Thufili002");

        //Get email properties and set
        Properties props = javaMailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("spring.mail.properties.mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        javaMailSender.setJavaMailProperties(props);
        
        return javaMailSender;
    }
}