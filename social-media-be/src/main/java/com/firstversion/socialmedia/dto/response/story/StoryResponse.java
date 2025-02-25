package com.firstversion.socialmedia.dto.response.story;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StoryResponse {
    private Long id;
    private UserStoryResponse user;
    private String mediaUrl;
    private String mediaType;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private MusicResponse music;
    private List<TextResponse> texts;
    private List<StickerResponse> stickers;
}
