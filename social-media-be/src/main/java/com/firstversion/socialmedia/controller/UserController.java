package com.firstversion.socialmedia.controller;

import com.firstversion.socialmedia.component.websocket.WSService;
import com.firstversion.socialmedia.dto.request.CreateUserRequest;
import com.firstversion.socialmedia.dto.response.user.FollowUserResponse;
import com.firstversion.socialmedia.dto.response.user.UserResponse;
import com.firstversion.socialmedia.exception.AlreadyExistException;
import com.firstversion.socialmedia.exception.ForbiddenAccessException;
import com.firstversion.socialmedia.exception.NotFoundException;
import com.firstversion.socialmedia.model.entity.User;
import com.firstversion.socialmedia.model.enums.UserStatus;
import com.firstversion.socialmedia.service.UserFollowerService;
import com.firstversion.socialmedia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    UserFollowerService userFollowerService;
    @Autowired
    WSService wsService;
    @GetMapping("/all-user")
    public ResponseEntity<?> getAllUser() {

        return ResponseEntity.ok(userService.getAllUser());
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody CreateUserRequest createUserRequest) {
        try {
            UserResponse response = userService.updateUser(createUserRequest);
            return ResponseEntity.ok(response);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (AlreadyExistException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }


    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        try {
            UserResponse userResponse = userService.findUserById(userId);
            return ResponseEntity.ok(userResponse);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // follower là người theo dõi userId
    @PutMapping("/follow/{followedId}")
    public ResponseEntity<?> followUserHandle(@RequestHeader("Authorization") String jwt, @PathVariable Long followedId) {
        try {
            String message = userFollowerService.handleFollow_UnfollowUser(followedId, jwt.substring(7));
            return ResponseEntity.ok(message);
        } catch (AlreadyExistException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/find-by-email")
    public ResponseEntity<?> findUserByEmail(@RequestParam String email) {
        try {
            UserResponse response = userService.findUserByEmail(email);
            return ResponseEntity.ok(response);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchUser(@RequestParam String query) {
        return ResponseEntity.ok(userService.searchUsers(query));
    }

    @GetMapping("/get-list-follower")
    public ResponseEntity<?> getListFollower(@RequestHeader("Authorization") String jwt) {
        List<FollowUserResponse> responses = userFollowerService.findListFollowerByUserId(jwt.substring(7));
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/get-list-following")
    public ResponseEntity<?> getListFollowing(@RequestHeader("Authorization") String jwt) {
        List<FollowUserResponse> responses = userFollowerService.findListFollowingByUserId(jwt.substring(7));
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        UserResponse response = userService.findUserDetails();
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/upload-avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> doUploadAvatar(@RequestPart MultipartFile image) throws IOException {
        String imageUrl = userService.doUploadAvatar(image);
        if (imageUrl == null) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Can not upload avatar for user.");
        } else {
            return ResponseEntity.ok(imageUrl);
        }
    }



//    STATUS OF USER
    @PutMapping("/status/{userId}")
    public ResponseEntity<?> updateUserStatus(@PathVariable Long userId, @RequestBody UserStatus newStatus) {
        try {
            UserStatus updateStatus = userService.updateUserStatus(userId, newStatus);
            User foundUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            // update status user to friend
            wsService.notifyFriends(foundUser);
            return ResponseEntity.ok(updateStatus);
        } catch (ForbiddenAccessException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    @GetMapping("/all-friends")
    public ResponseEntity<?> getAllFriends() {
        List<UserResponse> response = userService.getFriendList();
        return ResponseEntity.ok(response);
    }

}
