package com.example.safarizote;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;

import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

@SpringBootApplication
public class SafarizoteApplication {

	public static void main(String[] args) {
		SpringApplication.run(SafarizoteApplication.class, args);
	}
}
