package com.firstversion.socialmedia.repository;

import com.firstversion.socialmedia.model.entity.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {
    @Query("Select s from Story s where s.user.id=:userId")
    List<Story> findByUserId(Long userId);
    @Query(value = "SELECT * FROM story WHERE expires_at > :dateTime", nativeQuery = true)
    List<Story> findValidStories(@Param("dateTime") LocalDateTime dateTime);
    Story findByIdAndUserId(Long id, Long userId);
}
