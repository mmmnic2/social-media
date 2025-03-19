package com.firstversion.socialmedia.controller;

import com.firstversion.socialmedia.dto.request.CreateMessageRequest;
import com.firstversion.socialmedia.dto.response.message.MessageResponse;
import com.firstversion.socialmedia.model.entity.User;
import com.firstversion.socialmedia.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller quản lý tin nhắn trong các cuộc trò chuyện.
 */
@RestController
@RequestMapping("/api/v1/message")
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;

    /**
     * Lấy danh sách tin nhắn theo ID của cuộc trò chuyện.
     *
     * @param chatId ID của cuộc trò chuyện.
     * @return Danh sách tin nhắn thuộc về cuộc trò chuyện đó.
     */
    @GetMapping("/{chatId}")
    public ResponseEntity<List<MessageResponse>> findByChat(@PathVariable Long chatId) {
        return ResponseEntity.ok(messageService.findMessageByChat(chatId));
    }

    /**
     * Gửi tin nhắn trong cuộc trò chuyện.
     *
     * @param request Nội dung tin nhắn.
     * @return Tin nhắn sau khi được gửi thành công.
     */
    @PostMapping("/create-message")
    public ResponseEntity<MessageResponse> createMessage(@RequestBody CreateMessageRequest request) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(messageService.createMessage(user, request));
    }
}
