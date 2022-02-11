package com.example.safarizote.utils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.example.safarizote.model.ContactUs;
import com.example.safarizote.model.UserAuth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.UnknownHostException;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Properties;

import javax.mail.internet.InternetAddress;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

@Service("mailService")
public class JavaEmailClient {
    private static final Logger logger = LoggerFactory.getLogger(JavaEmailClient.class);

    @Autowired
    private Configuration configuration;

    public void contactUs(ContactUs email) throws MailException, UnknownHostException {
        MimeMessage mimeMessage = getJavaMailSender().createMimeMessage();
        try {

            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            String subject = "From " + email.getEmail() + ". General User message. No Special topic";
            mimeMessageHelper.setSubject(subject);
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

    public String sendMail(ContactUs email, Map<String, String> model) throws MailException, UnknownHostException {

        String response;
        MimeMessage message = getJavaMailSender().createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());

            ClassPathResource pdf = new ClassPathResource("static/attachment.pdf");
            ClassPathResource image = new ClassPathResource("static/asbnotebook.png");
            Template template = configuration.getTemplate("email.ftl");
            String html = FreeMarkerTemplateUtils.processTemplateIntoString(template, model);
            String emailTo = "mkunsim@gmail.com";
            String subject = "The Road sufferers";
            helper.setTo(emailTo);
            helper.setFrom(email.getEmail());
            helper.setSubject(subject);
            helper.setText(html, true);
            helper.addInline("asbnotebook", image);
            helper.addAttachment("attachment.pdf", pdf);

            getJavaMailSender().send(message);
            response = "Email has been sent to :" + emailTo;
        } catch (MessagingException | IOException | TemplateException e) {
            String emailTo = "mkunsim@gmail.com";
            response = "Email send failure to :" + emailTo;
        }
        return response;
    }

    public void signedInMessage(UserAuth userAuth) throws MailException, UnknownHostException {
        MimeMessage mimeMessage = getJavaMailSender().createMimeMessage();

        try {

            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            String fromAddress = "mkunsim@gmail.com";
            String subject = "Please verify your registration";
            String message = "Dear [[name]],<br>"
                    + "Please click the link below to verify your registration:<br>"
                    + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                    + "You are now Signed in to safarizote.heroku.com"
                    + "Thank you,<br>"
                    + "Your company name.";

            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setFrom(new InternetAddress(userAuth.getEmail(), fromAddress));
            mimeMessageHelper.setTo(userAuth.getEmail());
            mimeMessageHelper.setText(message);

            logger.info(mimeMessageHelper.toString());
            getJavaMailSender().send(mimeMessageHelper.getMimeMessage());

        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

    }

    @Bean
    public JavaMailSender getJavaMailSender() throws UnknownHostException {
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setProtocol("smtp");
        javaMailSender.setHost("smtp.gmail.com");
        javaMailSender.setPort(587);
        javaMailSender.setUsername("mkunsim@gmail.com");
        javaMailSender.setPassword("Thufili002");

        Properties props = javaMailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("spring.mail.properties.mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        props.put("spring.mail.properties.mail.smtp.auth", "true");
        props.put("spring.mail.properties.mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.debug", "true");
        props.put("spring.mail.properties.mail.smtp.connectiontimeout", "5000");
        props.put("spring.mail.properties.mail.smtp.timeout", "5000");
        props.put("spring.mail.properties.mail.smtp.writetimeout", "5000");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        props.put("mail.smtp.ssl.protocols", "TLSv1.2");

        javaMailSender.setJavaMailProperties(props);

        return javaMailSender;
    }
}