package com.firstversion.socialmedia.component.eventlistener;

import com.firstversion.socialmedia.component.websocket.WSService;
import com.firstversion.socialmedia.model.enums.UserStatus;
import com.firstversion.socialmedia.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.security.Principal;
import java.util.Optional;

/**
 * Lắng nghe sự kiện WebSocket để cập nhật trạng thái người dùng.
 * <p>
 * - Khi người dùng kết nối, trạng thái sẽ chuyển thành {@code ONLINE}.
 * - Khi người dùng ngắt kết nối, trạng thái sẽ chuyển thành {@code OFFLINE}.
 * - Thông báo trạng thái mới cho bạn bè của họ thông qua WebSocket.
 */
@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final UserRepository userRepository;
    private final WSService wsService;

    /**
     * Xử lý sự kiện khi người dùng kết nối vào WebSocket.
     *
     * @param event {@link SessionConnectedEvent} sự kiện kết nối WebSocket
     */
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        getEmailFromEvent(event).flatMap(userRepository::findUserByEmail).ifPresent(user -> {
            user.setUserStatus(UserStatus.ONLINE);
            userRepository.save(user);
            wsService.notifyFriends(user); // Thông báo trạng thái mới
        });
    }

    /**
     * Xử lý sự kiện khi người dùng ngắt kết nối khỏi WebSocket.
     *
     * @param event {@link SessionDisconnectEvent} sự kiện ngắt kết nối WebSocket
     */
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        getEmailFromEvent(event).flatMap(userRepository::findUserByEmail).ifPresent(user -> {
            user.setUserStatus(UserStatus.OFFLINE);
            userRepository.save(user);
            wsService.notifyFriends(user); // Thông báo trạng thái mới
        });
    }

    /**
     * Lấy địa chỉ email của người dùng từ sự kiện WebSocket.
     *
     * @param event sự kiện WebSocket (có thể là {@link SessionConnectedEvent} hoặc {@link SessionDisconnectEvent})
     * @return {@link Optional} chứa email nếu có, ngược lại trả về {@code Optional.empty()}
     */
    private Optional<String> getEmailFromEvent(SessionConnectedEvent event) {
        Principal user = event.getUser();
        return user != null ? Optional.ofNullable(user.getName()) : Optional.empty();
    }

    private Optional<String> getEmailFromEvent(SessionDisconnectEvent event) {
        Principal user = event.getUser();
        return user != null ? Optional.ofNullable(user.getName()) : Optional.empty();
    }
}
