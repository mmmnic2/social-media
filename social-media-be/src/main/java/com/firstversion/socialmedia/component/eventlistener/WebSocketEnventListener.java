package com.firstversion.socialmedia.component.eventlistener;

import com.firstversion.socialmedia.exception.NotFoundException;
import com.firstversion.socialmedia.model.entity.User;
import com.firstversion.socialmedia.model.enums.UserStatus;
import com.firstversion.socialmedia.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.security.Principal;

@Component
@RequiredArgsConstructor
public class WebSocketEnventListener {
    private final UserRepository userRepository;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        Principal user = event.getUser();
        System.out.println(user);
        if (user != null) {
            String email = user.getName();
            User userLogin = userRepository.findUserByEmail(email).orElseThrow(() -> new NotFoundException("User  not found"));
            userLogin.setUserStatus(UserStatus.ONLINE);
            userRepository.save(userLogin);
        }
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event){

    }
}
