package com.firstversion.socialmedia.controller;

import com.firstversion.socialmedia.dto.request.FriendRequest;
import com.firstversion.socialmedia.model.entity.Friendship;
import com.firstversion.socialmedia.model.enums.FriendshipStatus;
import com.firstversion.socialmedia.service.FriendshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller quản lý các API liên quan đến kết bạn.
 */
@RestController
@RequestMapping("/api/v1/friendship")
@RequiredArgsConstructor
public class FriendshipController {
    private final FriendshipService friendshipService;

    /**
     * API gửi yêu cầu kết bạn.
     *
     * @param friendRequest Dữ liệu yêu cầu kết bạn.
     * @return Thông tin về yêu cầu kết bạn sau khi được gửi.
     */
    @PostMapping("/send")
    public ResponseEntity<Friendship> sendFriendRequest(@RequestBody FriendRequest friendRequest) {
        return ResponseEntity.ok(friendshipService.sendFriendRequest(friendRequest));
    }

    /**
     * API phản hồi yêu cầu kết bạn (chấp nhận hoặc từ chối).
     *
     * @param friendshipId ID của yêu cầu kết bạn.
     * @param status       Trạng thái phản hồi (ACCEPTED / DECLINED).
     * @return Thông tin về trạng thái cập nhật của yêu cầu kết bạn.
     */
    @PutMapping("/respond/{friendshipId}")
    public ResponseEntity<Friendship> respondToFriendRequest(@PathVariable Long friendshipId,
                                                             @RequestParam FriendshipStatus status) {
        return ResponseEntity.ok(friendshipService.respondToFriendRequest(friendshipId, status));
    }

    /**
     * API lấy danh sách tất cả yêu cầu kết bạn đang chờ xử lý.
     *
     * @return Danh sách các yêu cầu kết bạn đang chờ.
     */
    @GetMapping("/all-pending-requests")
    public ResponseEntity<List<Friendship>> getAllPendingRequests() {
        return ResponseEntity.ok(friendshipService.getPendingRequests());
    }
}
