package com.firstversion.socialmedia.model.entity;

import com.firstversion.socialmedia.dto.response.notification.NotificationResponse;
import com.firstversion.socialmedia.model.enums.NotificationType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Notification extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;
    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiver;
    @Column
    private boolean isRead = false;
    @Column
    @Enumerated(EnumType.STRING)
    private NotificationType type;

    public String getMessage() {
        return sender.getFullName() + " " + type.getPrefix();
    }

    public NotificationResponse toNotificationResponse() {
        NotificationResponse response = new NotificationResponse();
        response.setNotificationId(id);
        response.setRead(isRead);
        response.setMessage(this.getMessage());
        response.setSender(sender.toUserResponse());
        response.setReceiver(receiver.toUserResponse());
        response.setType(type);
        return response;
    }
}
