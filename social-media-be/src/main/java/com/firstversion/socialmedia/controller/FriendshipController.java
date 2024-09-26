package com.firstversion.socialmedia.controller;

import com.firstversion.socialmedia.dto.request.FriendRequest;
import com.firstversion.socialmedia.model.entity.Friendship;
import com.firstversion.socialmedia.model.enums.FriendshipStatus;
import com.firstversion.socialmedia.service.FriendshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/friendship")
@RequiredArgsConstructor
public class FriendshipController {
    private final FriendshipService friendshipService;
    @PostMapping("/send")
    public ResponseEntity<?> sendFriendRequest(@RequestBody FriendRequest friendRequest){
        Friendship response = friendshipService.sendFriendRequest(friendRequest);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/respond/{friendshipId}")
    public ResponseEntity<?> respondToFriendRequest(@RequestParam FriendshipStatus status, @PathVariable Long friendshipId) {
        Friendship response = friendshipService.respondToFriendRequest(friendshipId, status);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/all-pending-requests")
    public ResponseEntity<?> getAllPendingRequests(){
        List<Friendship> responses = friendshipService.getPendingRequests();
        return ResponseEntity.ok(responses);
    }
}
