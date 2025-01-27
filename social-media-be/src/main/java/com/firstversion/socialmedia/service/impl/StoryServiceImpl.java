package com.firstversion.socialmedia.service.impl;

import com.firstversion.socialmedia.config.CloudinaryService;
import com.firstversion.socialmedia.dto.request.CreateStoryRequest;
import com.firstversion.socialmedia.dto.response.story.StoryResponse;
import com.firstversion.socialmedia.exception.NotFoundException;
import com.firstversion.socialmedia.model.entity.Post;
import com.firstversion.socialmedia.model.entity.Story;
import com.firstversion.socialmedia.model.entity.User;
import com.firstversion.socialmedia.repository.StoryRepository;
import com.firstversion.socialmedia.repository.UserRepository;
import com.firstversion.socialmedia.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class StoryServiceImpl implements StoryService {
    @Autowired
    StoryRepository storyRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CloudinaryService cloudinaryService;

    @Override
    public StoryResponse createStory(CreateStoryRequest storyRequest) throws IOException{
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        Story story = new Story();
        String contentUrl = uploadVideo(storyRequest.getContent());
        story.setType(storyRequest.getType());
        story.setExpiredAt(LocalDateTime.now().plusHours(24));
        if (contentUrl != null) story.setContentUrl(contentUrl);
        story.setUser(user);
        Story saveStory = storyRepository.save(story);
        return saveStory.toStoryResponse();
    }

    public List<Story> getValidStories() {
        return storyRepository.findValidStories(LocalDateTime.now());
    }


    @Override
    public List<StoryResponse> findStoryByUserId(Long userId) {
        User foundUser = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found."));
        List<Story> stories = storyRepository.findByUserId(userId);
        if (stories.isEmpty())
            return List.of();
        else
            return stories.stream().map(Story::toStoryResponse).toList();
    }

    @Override
    public void deleteStory(Long userId, Long storyId) {
        Story story = storyRepository.findByIdAndUserId(storyId, userId);
        if (story != null) {
            storyRepository.delete(story);
        } else {
            throw new IllegalArgumentException("Story not found or user not authorized");
        }
    }

    public void deleteExpiredStories() {
        List<Story> expiredStories = storyRepository.findValidStories(LocalDateTime.now());
        storyRepository.deleteAll(expiredStories);
    }

    private String uploadVideo(MultipartFile src) throws IOException {
        String videoUrl = null;
        if (src != null) {
            Map<String, Object> result = cloudinaryService.uploadVideo(src);
            videoUrl = result.get("url").toString();
        }
        return videoUrl;
    }
}
