package com.firstversion.socialmedia.service.impl;

import com.firstversion.socialmedia.dto.request.NotificationRequest;
import com.firstversion.socialmedia.dto.response.notification.NotificationResponse;
import com.firstversion.socialmedia.dto.response.user.UserResponse;
import com.firstversion.socialmedia.exception.AccessDeniedException;
import com.firstversion.socialmedia.exception.NotFoundException;
import com.firstversion.socialmedia.model.entity.Notification;
import com.firstversion.socialmedia.model.entity.User;
import com.firstversion.socialmedia.repository.NotificationRepository;
import com.firstversion.socialmedia.repository.UserRepository;
import com.firstversion.socialmedia.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;
    @Override
    public NotificationResponse createNotifify(NotificationRequest notificationRequest) {
        User foundUser = userRepository.findById(notificationRequest.getSenderId()).orElseThrow(() -> new NotFoundException("Sender not found"));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User userLogin = (User) authentication.getPrincipal();
        if (!Objects.equals(foundUser.getId(), userLogin.getId()))
            throw new AccessDeniedException("Sender ID mismatch with login ID.");
        User foundReceiver = userRepository.findById(notificationRequest.getReceiverId()).orElseThrow(() -> new NotFoundException("Receiver not found."));
        Notification notification = new Notification();
        notification.setType(notificationRequest.getNotificationType());
        notification.setSender(foundUser);
        notification.setReceiver(foundReceiver);
        Notification savedNotify = notificationRepository.save(notification);
        return savedNotify.toNotificationResponse();
    }

    @Override
    public void markAsRead(Long notificationId) {
        Notification foundNotify = notificationRepository.findById(notificationId).orElseThrow(() -> new NotFoundException("Notification not found."));
        foundNotify.setRead(true);
        notificationRepository.save(foundNotify);
    }

    @Override
    public List<NotificationResponse> findByReceiver(Long receiverId) {
        User foundReceiver = userRepository.findById(receiverId).orElseThrow(() -> new NotFoundException("User not found."));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User userLogin = (User) authentication.getPrincipal();
        if (!Objects.equals(userLogin.getId(), foundReceiver.getId()))
            throw new AccessDeniedException("You do not have permission to get notifications.");
        List<Notification> notificationList = notificationRepository.findByReceiver(receiverId);
        return notificationList.stream().map(Notification::toNotificationResponse).toList();
    }

    @Override
    public void deleteNotification(Long notificationId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User userLogin = (User) authentication.getPrincipal();
        Notification notification = notificationRepository.findById(notificationId).orElseThrow(()-> new NotFoundException("Notification not found."));
        if(!Objects.equals(userLogin.getId(), notification.getReceiver().getId())) throw new AccessDeniedException("You do not have permission to delete notifications.");
        notificationRepository.delete(notification);
    }



}
