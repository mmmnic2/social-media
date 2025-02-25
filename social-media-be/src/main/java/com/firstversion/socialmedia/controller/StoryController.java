package com.firstversion.socialmedia.controller;

import com.firstversion.socialmedia.dto.request.CreatePostRequest;
import com.firstversion.socialmedia.dto.request.CreateStoryRequest;
import com.firstversion.socialmedia.dto.response.post.PostResponse;
import com.firstversion.socialmedia.dto.response.story.StoryResponse;
import com.firstversion.socialmedia.service.StoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/story")
public class StoryController {
    @Autowired
    StoryService storyService;

    @PostMapping("/create")
    public ResponseEntity<StoryResponse> createStory(@Valid @RequestBody CreateStoryRequest request) throws IOException {
        StoryResponse response = storyService.createStory(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/find-by-user/{userId}")
    public ResponseEntity<?> findByUserId(@PathVariable Long userId) {
        try {
            List<StoryResponse> responses = storyService.findStoryByUserId(userId);
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{storyId}")
    public void deleteStory(@RequestParam Long userId, @PathVariable Long storyId) {
        storyService.deleteStory(userId, storyId);
    }
}
