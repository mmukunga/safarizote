package com.example.safarizote.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.safarizote.model.Safari;
import com.example.safarizote.repository.SafariRepository;

@RestController
public class SafarisController {

	@Autowired
	private SafariRepository repository;

	@GetMapping("/api/safaris")
	public ResponseEntity<List<Safari>> getSafaris() {
		List<Safari> safaris = repository.findAll();
		HttpHeaders headers = new HttpHeaders();
		headers.add("Responded", "SafarisController");
		return new ResponseEntity<>(safaris, headers, HttpStatus.OK);
	}

	@PostMapping(value = "/api/checkout")
	public ResponseEntity<List<Safari>> checkout() {
		List<Safari> safaris = repository.findAll();
		HttpHeaders headers = new HttpHeaders();
		headers.add("Responded", "SafarisController");
		return new ResponseEntity<>(safaris, headers, HttpStatus.OK);
	}
}