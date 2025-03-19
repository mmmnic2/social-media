package com.firstversion.socialmedia.controller;

import com.firstversion.socialmedia.dto.request.CreateChatRequest;
import com.firstversion.socialmedia.dto.response.chat.ChatResponse;
import com.firstversion.socialmedia.model.entity.User;
import com.firstversion.socialmedia.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller quản lý các API liên quan đến chat giữa người dùng.
 */
@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    /**
     * API tạo cuộc trò chuyện mới.
     *
     * @param createChatRequest Dữ liệu yêu cầu tạo chat.
     * @return Thông tin cuộc trò chuyện sau khi tạo thành công.
     */
    @PostMapping("/create-chat")
    public ResponseEntity<ChatResponse> createChat(@RequestBody CreateChatRequest createChatRequest) {
        User foundUser = getAuthenticatedUser();
        ChatResponse response = chatService.createChat(foundUser.getId(), createChatRequest);
        return ResponseEntity.ok(response);
    }

    /**
     * API lấy thông tin cuộc trò chuyện theo ID.
     *
     * @param chatId ID của cuộc trò chuyện.
     * @return Thông tin chi tiết của cuộc trò chuyện.
     */
    @GetMapping("/{chatId}")
    public ResponseEntity<ChatResponse> getChatById(@PathVariable Long chatId) {
        ChatResponse response = chatService.findChatById(chatId);
        return ResponseEntity.ok(response);
    }

    /**
     * API lấy danh sách các cuộc trò chuyện của người dùng hiện tại.
     *
     * @return Danh sách các cuộc trò chuyện của người dùng.
     */
    @GetMapping("/get-by-user")
    public ResponseEntity<List<ChatResponse>> findChatByUser() {
        User foundUser = getAuthenticatedUser();
        List<ChatResponse> responses = chatService.findAllChatByUser(foundUser.getId());
        return ResponseEntity.ok(responses);
    }

    /**
     * Phương thức hỗ trợ lấy người dùng hiện tại từ SecurityContext.
     *
     * @return Người dùng hiện tại đã xác thực.
     */
    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}
