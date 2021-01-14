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
public class EmailServiceImpl implements EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);
    
	@Autowired
	private JavaMailSender javaMailSender;

	@Override
	public void sendEmail() {
		logger.info("Simple Email sending start");

		SimpleMailMessage simpleMessage = new SimpleMailMessage();
		simpleMessage.setTo("dhirendra@example.com");
		simpleMessage.setSubject("Spring Boot=> Sending simple email");
		simpleMessage.setText("Dear Dhirendra, Hope you are doing well.");

		javaMailSender.send(simpleMessage);

		logger.info("Simple Email sent");

	}

	@Override
	public void sendEmailWithAttachment() {
		logger.info("Sending email with attachment start");

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();

		try {

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

		} catch (MessagingException e) {
			logger.error("Exeception=>sendEmailWithAttachment ", e);
		}

		logger.info("Email with attachment sent");
	}

	@Override
	public void sendHTMLEmail() {
		logger.info("HTML email sending start");
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();

		try {

			// Set multipart mime message true
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage,
					true);

			mimeMessageHelper.setTo("manish@example.com");
			mimeMessageHelper.setSubject("Spring Boot=> Sending HTML email");

			String html = "<h3>Dear Manish</h3></br>"
					+ "<p>Many many congratulation for joining "
					+ "<strong>Websparrow.org Team</strong>.</p>" + "</br></br>"
					+ "<p>You are entitled for <code>Rs.5000</code> "
					+ "as joning bonus.</p>";
			mimeMessageHelper.setText(html, true);

			javaMailSender.send(mimeMessage);

		} catch (MessagingException e) {
			logger.error("Exeception=>sendHTMLEmail ", e);
		}

		logger.info("HTML email sent");

	}
}