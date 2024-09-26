package com.firstversion.socialmedia.dto.request;

import com.firstversion.socialmedia.model.enums.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationRequest {
    private Long senderId;
    private Long receiverId;
    private NotificationType notificationType;
}
