package com.example.safarizote.controller;

import java.util.Random;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Set;

import com.example.safarizote.model.Kupong;
import com.example.safarizote.model.Rekke;

@RestController
public class LottoController {
  int antallRekker = 10;
  int antallTrekk = 7;

  @GetMapping("/api/tipping")
  public ResponseEntity<Set<Rekke>> tipping() {
    Random random = new Random();
    int kupongId = random.nextInt((2040 - 1970) + 1) + 1970;
    Kupong kupong = new Kupong(kupongId);

    for (int i = 0; i < antallRekker; i++) {
      Rekke rekke = trekkRekke(i, 34);
      Set<Rekke> rekker = kupong.getRekker();
      boolean fraFoer;
      do {
        fraFoer = false;
        for (Rekke r : rekker) {
          if (r.equals(rekke)) {
            fraFoer = true;
          }
        }
      } while (fraFoer);

      kupong.add(rekke);
    }

    return ResponseEntity.ok().body(kupong.getRekker());
  }

  public Rekke trekkRekke(int pos, int max) {
    String lpadded = String.format("%02d", pos);
    StringBuilder builder = new StringBuilder();
    builder.append("R").append(lpadded);
    Rekke rekke = new Rekke(builder.toString());

    for (int i = 0; i < antallTrekk; i++) {
      int tall;
      boolean fraFør;

      do {
        fraFør = false;
        tall = (int) (Math.random() * 34) + 1;
        if (rekke.getRad().contains(tall)) {
          fraFør = true;
        }
      } while (fraFør);

      rekke.add(tall);
    }
    return rekke;
  }
}