package com.example.safarizote.model;

import java.util.Comparator;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;

public class Kupong {
  int id;
  SortedSet<Rekke> rekker = new TreeSet<>(Comparator.comparing(Rekke::getPos));

  public Kupong(int id) {
    this.id = id;
  }

  public int getId() {
    return id;
  }

  public void add(Rekke rekke) {
    this.rekker.add(rekke);
  }

  public Set<Rekke> getRekker() {
    return rekker;
  }
}
