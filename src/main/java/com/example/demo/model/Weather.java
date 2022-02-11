package com.example.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Weather {
	@Id
	@GeneratedValue
	Long id;
	@NonNull
	String main;
	@NonNull
	String description;
	@NonNull
	Float temp;
	@NonNull
	String country;
	@NonNull
	String city;
}