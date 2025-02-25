package com.firstversion.socialmedia.mapper;

import com.firstversion.socialmedia.dto.response.story.MusicResponse;
import com.firstversion.socialmedia.dto.response.story.StoryResponse;
import com.firstversion.socialmedia.dto.response.story.UserStoryResponse;
import com.firstversion.socialmedia.model.entity.Story;
import org.springframework.stereotype.Component;

@Component
public class StoryMapper {
    public StoryResponse toStoryResponse(Story story) {
        StoryResponse response = new StoryResponse();
        response.setId(story.getId());
        response.setMediaUrl(story.getMediaUrl());
        response.setCreatedAt(story.getCreatedAt());
        response.setExpiresAt(story.getExpiresAt());

        UserStoryResponse userResponse = new UserStoryResponse();
        userResponse.setId(story.getUser().getId());
        userResponse.setUsername(story.getUser().getUsername());
        userResponse.setAvatarUrl(story.getUser().getImageUrl());
        response.setUser(userResponse);

        if (story.getMusic() != null) {
            MusicResponse musicResponse = new MusicResponse();
            musicResponse.setId(story.getMusic().getId());
            musicResponse.setTitle(story.getMusic().getTitle());
            musicResponse.setArtist(story.getMusic().getArtist());
            musicResponse.setThumbnailUrl(story.getMusic().getThumbnailUrl());
            musicResponse.setFileUrl(story.getMusic().getFileUrl());
            response.setMusic(musicResponse);
        }

        return response;
    }
}
