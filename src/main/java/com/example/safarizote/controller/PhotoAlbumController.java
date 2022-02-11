package com.example.safarizote.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import com.example.safarizote.model.Safari;
import com.example.safarizote.repository.SafariRepository;

@RestController
public class PhotoAlbumController {

	@Autowired
	private SafariRepository repository;

	@GetMapping("/api/photoAlbum")
	public ResponseEntity<List<Safari>> getPhotoAlbum() {
		List<Safari> photoAlbum = repository.findAll();
		HttpHeaders headers = new HttpHeaders();
		return ResponseEntity.accepted().headers(headers).body(photoAlbum);

	}
}