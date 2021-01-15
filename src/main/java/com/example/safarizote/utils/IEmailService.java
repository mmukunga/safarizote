package com.example.safarizote.utils;

import javax.mail.MessagingException;

import com.example.safarizote.model.Email;

public interface IEmailService {
    void sendEmail(Email email);
	void sendEmailWithAttachment() throws MessagingException;
	void sendHTMLEmail();
}