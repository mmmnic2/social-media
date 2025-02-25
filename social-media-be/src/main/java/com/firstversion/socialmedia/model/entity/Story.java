package com.firstversion.socialmedia.model.entity;

import com.firstversion.socialmedia.dto.response.story.MusicResponse;
import com.firstversion.socialmedia.dto.response.story.StickerResponse;
import com.firstversion.socialmedia.dto.response.story.StoryResponse;
import com.firstversion.socialmedia.dto.response.story.TextResponse;
import com.firstversion.socialmedia.dto.response.story.UserStoryResponse;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String mediaUrl;
    private String mediaType;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;

    @ManyToOne
    @JoinColumn(name = "music_id")
    private Music music;

    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StoryText> texts;

    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StorySticker> stickers;

}
