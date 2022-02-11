package com.example.safarizote.repository;

import com.example.safarizote.model.FamilieAlbum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FamilieAlbumRepository extends JpaRepository<FamilieAlbum, Long> {
    FamilieAlbum findByFolder(String folder);
}
