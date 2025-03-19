package com.firstversion.socialmedia.component.websocket;

import com.firstversion.socialmedia.component.jwt.JwtUtils;
import com.firstversion.socialmedia.model.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * Xử lý quá trình bắt tay (handshake) khi kết nối WebSocket.
 * <p>
 * CustomHandshakeHandler xác định người dùng dựa trên thông tin xác thực hiện có,
 * giúp thiết lập Principal cho các kết nối WebSocket.
 * </p>
 */
@Component
@RequiredArgsConstructor
public class CustomHandshakeHandler extends DefaultHandshakeHandler {
    private final JwtUtils jwtUtils;

    /**
     * Xác định thông tin người dùng (Principal) trong quá trình bắt tay WebSocket.
     * <p>
     * Nếu người dùng đã đăng nhập, lấy thông tin từ SecurityContextHolder.
     * Trả về đối tượng {@link UserPrincipal} chứa thông tin ID, email và vai trò của người dùng.
     * </p>
     *
     * @param request    Yêu cầu HTTP từ client.
     * @param wsHandler  WebSocketHandler xử lý kết nối.
     * @param attributes Thuộc tính của kết nối WebSocket.
     * @return Đối tượng Principal đại diện cho người dùng hoặc {@code null} nếu không xác thực được.
     */
    @Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler, Map<String, Object> attributes) {
        // Lấy thông tin người dùng đã đăng nhập từ SecurityContextHolder
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof User userLogin) {
            String email = userLogin.getEmail();
            Long userId = userLogin.getId();
            List<String> roles = Collections.singletonList(String.valueOf(userLogin.getRole()));

            return new UserPrincipal(userId, email, roles);
        }

        return null;
    }
}
