package com.firstversion.socialmedia.service.impl;

import com.firstversion.socialmedia.config.CloudinaryService;
import com.firstversion.socialmedia.common.constant.CloudinaryConstant;
import com.firstversion.socialmedia.dto.request.CreateStoryRequest;
import com.firstversion.socialmedia.dto.response.story.StoryResponse;
import com.firstversion.socialmedia.exception.NotFoundException;
import com.firstversion.socialmedia.mapper.StoryMapper;
import com.firstversion.socialmedia.model.entity.Music;
import com.firstversion.socialmedia.model.entity.Sticker;
import com.firstversion.socialmedia.model.entity.Story;
import com.firstversion.socialmedia.model.entity.StorySticker;
import com.firstversion.socialmedia.model.entity.StoryText;
import com.firstversion.socialmedia.model.entity.User;
import com.firstversion.socialmedia.repository.MusicRepository;
import com.firstversion.socialmedia.repository.StickerRepository;
import com.firstversion.socialmedia.repository.StoryRepository;
import com.firstversion.socialmedia.repository.StoryStickerRepository;
import com.firstversion.socialmedia.repository.StoryTextRepository;
import com.firstversion.socialmedia.repository.UserRepository;
import com.firstversion.socialmedia.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class StoryServiceImpl implements StoryService {
    @Autowired
    StoryRepository storyRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    MusicRepository musicRepository;
    @Autowired
    StickerRepository stickerRepository;
    @Autowired
    StoryStickerRepository storyStickerRepository;
    @Autowired
    StoryTextRepository storyTextRepository;
    @Autowired
    CloudinaryService cloudinaryService;
    private Logger logger;
    @Autowired
    private StoryMapper storyMapper;

    @Override
    public StoryResponse createStory(CreateStoryRequest storyRequest) throws IOException{
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        Music music = storyRequest.getMusicId() != null ?
                musicRepository.findById(storyRequest.getMusicId()).orElse(null) : null;

        Story story = new Story();
        Map contentUrl = cloudinaryService.uploadVideo(storyRequest.getContent(), CloudinaryConstant.STORY);
        logger.info("map content: " + contentUrl);
        story.setUser(user);
        story.setMediaUrl(contentUrl.toString());
        story.setCreatedAt(LocalDateTime.now());
        story.setExpiresAt(LocalDateTime.now().plusHours(24));
        story.setMusic(music);
        story = storyRepository.save(story);

        if (storyRequest.getTexts() != null && !storyRequest.getTexts().isEmpty()) {
            Story finalStory = story;
            List<StoryText> texts = storyRequest.getTexts().stream().map(textRequest -> {
                StoryText text = new StoryText();
                text.setStory(finalStory);
                text.setText(textRequest.getContent());
                text.setPositionX(textRequest.getPositionX());
                text.setPositionY(textRequest.getPositionY());
                text.setColor(textRequest.getColor());
                text.setFont(textRequest.getFontSize());
                return text;
            }).toList();
            storyTextRepository.saveAll(texts);
        }

        if (storyRequest.getStickers() != null) {
            Story finalStory1 = story;
            List<StorySticker> stickerEntities = storyRequest.getStickers().stream().map(stickerRequest -> {
                Sticker sticker = stickerRepository.findById(stickerRequest.getStickerId())
                        .orElseThrow(() -> new RuntimeException("Sticker not found"));

                StorySticker storySticker = new StorySticker();
                storySticker.setStory(finalStory1);
                storySticker.setSticker(sticker);
                storySticker.setPositionX(stickerRequest.getPositionX());
                storySticker.setPositionY(stickerRequest.getPositionY());
                storySticker.setScale(stickerRequest.getScale());
                return storySticker;
            }).toList();
            storyStickerRepository.saveAll(stickerEntities);
        }

        return storyMapper.toStoryResponse(story);
    }

    public List<Story> getValidStories() {
        return storyRepository.findValidStories(LocalDateTime.now());
    }


    @Override
    public List<StoryResponse> findStoryByUserId(Long userId) {
        List<Story> stories = storyRepository.findByUserId(userId);
        return stories.stream()
                .map(storyMapper::toStoryResponse)
                .collect(Collectors.toList());
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
}
