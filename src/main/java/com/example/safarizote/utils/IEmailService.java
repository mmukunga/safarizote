package com.example.safarizote.utils;

import javax.mail.MessagingException;

public interface IEmailService {
    void sendEmail();
	void sendEmailWithAttachment() throws MessagingException;
	void sendHTMLEmail();
}