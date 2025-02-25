package com.firstversion.socialmedia.repository;

import com.firstversion.socialmedia.model.entity.Sticker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StickerRepository extends JpaRepository<Sticker, Long> {
}
