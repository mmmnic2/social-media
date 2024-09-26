package com.firstversion.socialmedia.service;

import com.firstversion.socialmedia.dto.request.NotificationRequest;
import com.firstversion.socialmedia.dto.response.notification.NotificationResponse;
import com.firstversion.socialmedia.model.entity.Notification;
import com.firstversion.socialmedia.model.entity.User;

import java.util.List;

public interface NotificationService {
    NotificationResponse createNotifify(NotificationRequest notificationRequest);
    void markAsRead(Long notificationId);
    List<NotificationResponse> findByReceiver(Long receiverId);
    void deleteNotification(Long notificationId);
}
