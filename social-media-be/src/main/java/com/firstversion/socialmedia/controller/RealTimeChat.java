package com.firstversion.socialmedia.controller;

import com.firstversion.socialmedia.dto.response.message.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class RealTimeChat {
    private final SimpMessagingTemplate simpMessagingTemplate;

//    /**
//     * Gửi tin nhắn đến một nhóm chat.
//     * - Người dùng publish tin nhắn đến "/app/group/{groupId}"
//     * - Các thành viên trong nhóm subscribe "/topic/group/{groupId}" để nhận tin nhắn.
//     */
//    @MessageMapping("/group/{groupId}")
//    public void sendToGroup(@Payload MessageResponse message, @DestinationVariable String groupId) {
//        simpMessagingTemplate.convertAndSend("/topic/group/" + groupId, message);
//    }

    /**
     * Gửi tin nhắn đến một user theo từng cuộc trò chuyện.
     * - Người dùng gửi tin nhắn đến "/app/chat/{chatId}"
     * - Người nhận subscribe "/topic/messages/{chatId}" để nhận tin nhắn.
     */
    @MessageMapping("/chat/{chatId}")
    public void sendToUser(@Payload MessageResponse message, @DestinationVariable String chatId) {
        simpMessagingTemplate.convertAndSend( "/topic/messages/" + chatId, message);
    }

    /**
     * Đăng ký lắng nghe trạng thái online/offline của bạn bè.
     * - Khi client subscribe "/topic/friend-status/{userId}", server có thể gửi thông báo khi trạng thái thay đổi.
     */
    @SubscribeMapping("/topic/friend-status/{userId}")
    public void subscribeToFriendStatus(@DestinationVariable Long userId) {
        // Tại đây có thể gửi dữ liệu về trạng thái online/offline nếu cần
    }

}
