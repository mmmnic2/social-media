package com.firstversion.socialmedia.controller;

import com.firstversion.socialmedia.dto.response.message.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

@Controller
public class RealTimeChat {
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    // giải thích cách sử dụng:
    // anotation  @MessageMapping để khi người dùng send message tới đường dẫn này thì sẽ gọi vào hàm sendToGroup
    // sau đó hàm này sẽ thực hiện việc gửi tin nhắn tới user thông qua convertAndSendToUser(),
    // tin nhắn sẽ được gửi tới kênh "user/{userId}/private" tùy vào ta setup
    // sau đó những user đăng kí kênh  "user/{userId}/private" sẽ nhận được tin nhắn

//    @MessageMapping("/group/{groupId}")
//    public MessageResponse sendToGroup(@Payload MessageResponse message, @DestinationVariable String groupId) {
//        System.out.println(message);
//        simpMessagingTemplate.convertAndSendToUser(groupId, "/private-group", message);
//        return message;
//    }

    // đường dẫn này dùng để gửi tin nhắn cho từng cuộc trò chuyện
    // send messToServer qua đường dẫn /app/chat/${chatId} (publish)
    // receive message thông qua /user/${chatId}/private    (subcribe)
    @MessageMapping("/chat/{chatId}")
    public MessageResponse sendtoUser(@Payload MessageResponse message, @DestinationVariable String chatId) {
        simpMessagingTemplate.convertAndSend( "/topic/messages/" + chatId, message);
        return message;
    }

    // chanel để lắng nghe khi có user online/offline
    // subscribe: "/topic/friend-status/{userId}"
    @SubscribeMapping("/topic/friend-status/{userId}")
    public void subscribeToFriendStatus(@DestinationVariable Long userId) {
        // Đây là nơi client subscribe vào để lắng nghe cập nhật trạng thái bạn bè
    }

    // chanel cá nhân dùng để nhận các notifications
    // subscribe: '/user/queue/messages'




}
