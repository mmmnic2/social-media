package com.firstversion.socialmedia.dto.response.notification;

import com.firstversion.socialmedia.dto.BaseDTO;
import com.firstversion.socialmedia.dto.response.user.UserResponse;
import com.firstversion.socialmedia.model.entity.User;
import com.firstversion.socialmedia.model.enums.NotificationType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationResponse extends BaseDTO {
    private Long notificationId;
    private UserResponse sender;
    private UserResponse receiver;
    private boolean isRead;
    private NotificationType type;
    private String message;
}
