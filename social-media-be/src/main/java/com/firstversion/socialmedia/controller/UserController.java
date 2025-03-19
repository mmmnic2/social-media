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
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserFollowerService userFollowerService;
    private final WSService wsService;

    /**
     * Lấy danh sách tất cả người dùng.
     *
     * @return Danh sách {@link UserResponse}
     */
    @GetMapping("/all-user")
    public ResponseEntity<List<UserResponse>> getAllUser() {
        return ResponseEntity.ok(userService.getAllUser());
    }

    /**
     * Cập nhật thông tin người dùng.
     *
     * @param createUserRequest Dữ liệu người dùng cần cập nhật.
     * @return Thông tin người dùng sau khi cập nhật hoặc lỗi.
     */
    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody CreateUserRequest createUserRequest) {
        try {
            return ResponseEntity.ok(userService.updateUser(createUserRequest));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (AlreadyExistException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    /**
     * Lấy thông tin người dùng theo ID.
     *
     * @param userId ID của người dùng.
     * @return Thông tin {@link UserResponse} hoặc lỗi.
     */
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(userService.findUserById(userId));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    /**
     * Theo dõi hoặc bỏ theo dõi một người dùng.
     *
     * @param jwt       Token xác thực.
     * @param followedId ID của người được theo dõi.
     * @return Thông báo kết quả.
     */
    @PutMapping("/follow/{followedId}")
    public ResponseEntity<?> followUserHandle(@RequestHeader("Authorization") String jwt, @PathVariable Long followedId) {
        try {
            return ResponseEntity.ok(userFollowerService.handleFollow_UnfollowUser(followedId, jwt.substring(7)));
        } catch (AlreadyExistException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    /**
     * Tìm kiếm người dùng theo email.
     *
     * @param email Email cần tìm.
     * @return Thông tin {@link UserResponse} hoặc lỗi.
     */
    @GetMapping("/find-by-email")
    public ResponseEntity<?> findUserByEmail(@RequestParam String email) {
        try {
            return ResponseEntity.ok(userService.findUserByEmail(email));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    /**
     * Tìm kiếm người dùng theo từ khóa.
     *
     * @param query Từ khóa tìm kiếm.
     * @return Danh sách {@link UserResponse}
     */
    @GetMapping("/search")
    public ResponseEntity<List<UserResponse>> searchUser(@RequestParam String query) {
        return ResponseEntity.ok(userService.searchUsers(query));
    }

    /**
     * Lấy danh sách người theo dõi của người dùng.
     *
     * @param jwt Token xác thực.
     * @return Danh sách {@link FollowUserResponse}
     */
    @GetMapping("/get-list-follower")
    public ResponseEntity<List<FollowUserResponse>> getListFollower(@RequestHeader("Authorization") String jwt) {
        return ResponseEntity.ok(userFollowerService.findListFollowerByUserId(jwt.substring(7)));
    }

    /**
     * Lấy danh sách người mà người dùng đang theo dõi.
     *
     * @param jwt Token xác thực.
     * @return Danh sách {@link FollowUserResponse}
     */
    @GetMapping("/get-list-following")
    public ResponseEntity<List<FollowUserResponse>> getListFollowing(@RequestHeader("Authorization") String jwt) {
        return ResponseEntity.ok(userFollowerService.findListFollowingByUserId(jwt.substring(7)));
    }

    /**
     * Lấy thông tin hồ sơ của người dùng hiện tại.
     *
     * @return {@link UserResponse}
     */
    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getUserProfile() {
        return ResponseEntity.ok(userService.findUserDetails());
    }

    /**
     * Cập nhật ảnh đại diện của người dùng.
     *
     * @param image Ảnh đại diện.
     * @return URL ảnh đại diện sau khi cập nhật hoặc lỗi.
     */
    @PostMapping(value = "/upload-avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> doUploadAvatar(@RequestPart MultipartFile image) throws IOException {
        String imageUrl = userService.doUploadAvatar(image);
        return (imageUrl != null)
                ? ResponseEntity.ok(imageUrl)
                : ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Không thể tải lên ảnh đại diện.");
    }

    /**
     * Cập nhật trạng thái người dùng.
     *
     * @param userId    ID của người dùng.
     * @param newStatus Trạng thái mới.
     * @return Trạng thái sau khi cập nhật hoặc lỗi.
     */
    @PutMapping("/status/{userId}")
    public ResponseEntity<?> updateUserStatus(@PathVariable Long userId, @RequestBody UserStatus newStatus) {
        try {
            UserStatus updateStatus = userService.updateUserStatus(userId, newStatus);
            User foundUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            wsService.notifyFriends(foundUser);
            return ResponseEntity.ok(updateStatus);
        } catch (ForbiddenAccessException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    /**
     * Lấy danh sách bạn bè của người dùng hiện tại.
     *
     * @return Danh sách {@link UserResponse}
     */
    @GetMapping("/all-friends")
    public ResponseEntity<List<UserResponse>> getAllFriends() {
        return ResponseEntity.ok(userService.getFriendList());
    }
}
