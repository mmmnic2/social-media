package com.firstversion.socialmedia.controller;

import com.firstversion.socialmedia.dto.request.CreatePostRequest;
import com.firstversion.socialmedia.dto.request.CreateReelRequest;
import com.firstversion.socialmedia.dto.response.post.PostResponse;
import com.firstversion.socialmedia.dto.response.reels.ReelsResponse;
import com.firstversion.socialmedia.service.ReelsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/reels")
public class ReelsController {
    @Autowired
    private ReelsService reelsService;

//    @PostMapping("/create")
//    public ResponseEntity<?> createReels(@RequestPart(value = "caption", required = true) String caption,
//                                         @RequestPart(value = "image", required = true) MultipartFile video,
//                                         @RequestHeader("Authorization") String jwt) throws IOException {
//            try {
//                CreateReelRequest request = new CreateReelRequest();
//                request.setCaption(caption);
//                request.setVideo(video);
//                ReelsResponse response = reelsService.createReel(request, jwt);
//                return ResponseEntity.ok(response);
//            } catch (IOException e) {
//                return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(e.getMessage());
//            }
//
//    }

    @GetMapping("/all")
    public ResponseEntity<?> findAll() {
        try {
            List<ReelsResponse> responses = reelsService.findAllReels();
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> findReelsByUser(@PathVariable Long userId){
        try {
            List<ReelsResponse> responses = reelsService.findReelByUser(userId);
            if (responses != null) {
                return ResponseEntity.ok(responses);
            } else
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unable to create a reel.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
