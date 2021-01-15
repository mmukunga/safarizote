package com.example.safarizote.utils;

import java.net.UnknownHostException;
import com.example.safarizote.model.Email;
import org.springframework.mail.MailException;

public interface IEmailService {
    void sendEmail(Email email) throws MailException, UnknownHostException;
}