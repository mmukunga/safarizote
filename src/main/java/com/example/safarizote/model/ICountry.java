package com.example.safarizote.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Singular;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ICountry {
    @Id Long id;
    @NonNull String name;
    @NonNull String iso2;
}
