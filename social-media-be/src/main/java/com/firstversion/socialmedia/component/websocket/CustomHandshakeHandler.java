package com.firstversion.socialmedia.component.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Component
public class CustomHandshakeHandler extends DefaultHandshakeHandler {

    private static final Logger logger = LoggerFactory.getLogger(CustomHandshakeHandler.class);

    @Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler,
                                      Map<String, Object> attributes) {
        logger.info("[WebSocket] Xác định Principal từ attributes...");

        try {
            Long userId = Long.parseLong(Objects.toString(attributes.get("userId")));
            String email = Objects.toString(attributes.get("email"));
            List<String> roles = (List<String>) attributes.get("roles");

            logger.info("[WebSocket] Đã tạo UserPrincipal - userId={}, email={}", userId, email);
            return new UserPrincipal(userId, email, roles);
        } catch (Exception e) {
            logger.error("[WebSocket] Lỗi khi tạo Principal từ attributes: {}", e.getMessage(), e);
            return null;
        }
    }
}
