package com.example.demo.repository;

import com.example.demo.model.FamilieAlbum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FamilieAlbumRepository extends JpaRepository<FamilieAlbum, Long> {
    FamilieAlbum findByFolder(String folder);
}
