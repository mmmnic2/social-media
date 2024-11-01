package com.firstversion.socialmedia.controller;

import com.firstversion.socialmedia.dto.request.NotificationRequest;
import com.firstversion.socialmedia.dto.response.notification.NotificationResponse;
import com.firstversion.socialmedia.model.entity.Notification;
import com.firstversion.socialmedia.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notification")
public class NotificationController {
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    NotificationService notificationService;

    @PostMapping("/notify")
    public ResponseEntity<?> sendNotification(@RequestBody NotificationRequest request) {
        try {
            // Gửi thông báo tới tất cả client đăng ký vào topic "/topic/notifications"
            NotificationResponse response = notificationService.createNotifify(request);
            simpMessagingTemplate.convertAndSendToUser(response.getReceiver().getEmail(), "/queue/notifications", response);
            return ResponseEntity.ok(response);
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("WebSocket error: " + e.getMessage());
        } catch (Exception e) {
            // Bắt các lỗi chung
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send notification: " + e.getMessage());
        }

    }

    @PutMapping("/read/{notificationId}")
    public ResponseEntity<?> markAsRead(@PathVariable Long notificationId) {
        notificationService.markAsRead(notificationId);
        return ResponseEntity.ok("Read notification successful.");
    }
    @PutMapping("/unread/{notificationId}")
    public ResponseEntity<?> markAsUnread(@PathVariable Long notificationId) {
        notificationService.markAsUnread(notificationId);
        return ResponseEntity.ok("Unread notification successful.");
    }
    @GetMapping("/get-all-by-receiver/{receiverId}")
    public ResponseEntity<?> getAllNotification(@PathVariable Long receiverId){
        List<NotificationResponse> response = notificationService.findByReceiver(receiverId);
        return ResponseEntity.ok(response);
    }
}
