package com.firstversion.socialmedia.service;

import com.firstversion.socialmedia.dto.request.CreateStoryRequest;
import com.firstversion.socialmedia.dto.response.story.StoryResponse;

import java.io.IOException;
import java.util.List;

public interface StoryService {
    StoryResponse createStory(CreateStoryRequest storyRequest) throws IOException;
    List<StoryResponse> findStoryByUserId(Long userId);
    void deleteStory(Long userId, Long storyId);
    void deleteExpiredStories();
}
