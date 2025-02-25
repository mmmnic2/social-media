package com.firstversion.socialmedia.repository;

import com.firstversion.socialmedia.model.entity.StoryText;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryTextRepository extends JpaRepository<StoryText, Long> {
}
