package com.safari.springboot.safarizote.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.safari.springboot.safarizote.model.Emoji;

@Repository
public interface EmojiRepository extends JpaRepository<Emoji, Long> {
    @Query(value = "SELECT max(id) FROM Emoji")
    public Long getMaxId();
    public List<Emoji> findByName(String name);
}