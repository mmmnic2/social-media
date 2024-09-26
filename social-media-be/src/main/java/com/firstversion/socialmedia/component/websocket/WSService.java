package com.firstversion.socialmedia.component.websocket;


import com.firstversion.socialmedia.dto.response.user.UserResponse;
import com.firstversion.socialmedia.model.entity.User;
import com.firstversion.socialmedia.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WSService {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final UserRepository userRepository;

    public void notifyFriends(User user) {
        // Lấy danh sách bạn bè của người dùng
        List<User> friends = userRepository.getFriendList(user.getId());
        // Gửi cập nhật trạng thái tới từng bạn bè
        UserResponse response = user.toUserResponse();
        for (User friend : friends) {
            simpMessagingTemplate.convertAndSend("/topic/friend-status/" + friend.getId(), response);
        }
    }
}