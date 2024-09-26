package com.firstversion.socialmedia.component.eventlistener;

import com.firstversion.socialmedia.component.websocket.WSService;
import com.firstversion.socialmedia.dto.response.user.UserResponse;
import com.firstversion.socialmedia.exception.NotFoundException;
import com.firstversion.socialmedia.model.entity.User;
import com.firstversion.socialmedia.model.enums.UserStatus;
import com.firstversion.socialmedia.repository.FriendshipRepository;
import com.firstversion.socialmedia.repository.UserRepository;
import com.firstversion.socialmedia.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.security.Principal;
import java.util.List;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {
    private final UserRepository userRepository;
    private final WSService wsService;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        String email = getUsernameFromEvent(event);
        if (email != null) {
            User user = userRepository.findUserByEmail(email).orElse(null);
            System.out.println(user);
            if (user != null) {
                user.setUserStatus(UserStatus.ONLINE);
                userRepository.save(user);
                // update status online to your friend
                wsService.notifyFriends(user);
            }
        }
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        String email = Objects.requireNonNull(event.getUser()).getName();
        if (email != null) {
            User user = userRepository.findUserByEmail(email).orElse(null);
            if (user != null) {
                user.setUserStatus(UserStatus.OFFLINE);
                userRepository.save(user);
                // update status offline to friend
                wsService.notifyFriends(user);
            }
        }

    }

    private String getUsernameFromEvent(SessionConnectedEvent event) {
        Principal user = event.getUser();
        System.out.println(user);
        if (user != null) {
            return user.getName();
        }
        return null;
    }


}
