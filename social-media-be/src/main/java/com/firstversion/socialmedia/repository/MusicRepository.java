package com.firstversion.socialmedia.repository;

import com.firstversion.socialmedia.model.entity.Music;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MusicRepository extends JpaRepository<Music, Long> {
    Optional<Music> findById(Long id);
}
