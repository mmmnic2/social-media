package com.firstversion.socialmedia.component.websocket;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WSService {

    private final SimpMessagingTemplate messagingTemplate;

    public void sendMessage(final String message){
        messagingTemplate.convertAndSend("/receive/message",message);
    }
    public void sendPrivateMessage(final String message, final String id){

        messagingTemplate.convertAndSendToUser(id,"/receive/private-message", message);
    }
    public void sendNotification(final String message) {
        messagingTemplate.convertAndSend("/receive/global-notification",message);
    }
    public void sendPrivateNotification(final String message,final String id) {
        messagingTemplate.convertAndSendToUser(id,"/receive/private-notification",message);
    }

}