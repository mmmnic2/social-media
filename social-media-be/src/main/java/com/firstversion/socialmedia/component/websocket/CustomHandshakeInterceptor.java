package com.firstversion.socialmedia.component.websocket;

import com.firstversion.socialmedia.component.jwt.JwtUtils;
import com.firstversion.socialmedia.model.entity.User;
import com.firstversion.socialmedia.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class CustomHandshakeInterceptor implements HandshakeInterceptor {

    private static final Logger logger = LoggerFactory.getLogger(CustomHandshakeInterceptor.class);

    private final JwtUtils jwtUtils;
    private final UserService userService;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Map<String, Object> attributes) {
        if (request instanceof ServletServerHttpRequest servletRequest) {
            HttpServletRequest httpRequest = servletRequest.getServletRequest();
            Cookie[] cookies = httpRequest.getCookies();

            logger.info("[WebSocket] Bắt đầu quá trình xác thực WebSocket handshake...");

            String token = extractTokenFromCookies(cookies);

            if (token != null && jwtUtils.validateToken(token)) {
                String username = jwtUtils.extractUsername(token);
                logger.info("[WebSocket] Token hợp lệ - người dùng: {}", username);

                User user = (User) userService.loadUserByUsername(username);

                attributes.put("userId", user.getId());
                attributes.put("email", user.getEmail());
                attributes.put("roles", List.of(String.valueOf(user.getRole())));

                logger.info("[WebSocket] Xác thực thành công. Gán thông tin userId={} vào attributes", user.getId());
                return true;
            } else {
                logger.warn("[WebSocket] Token không hợp lệ hoặc không tìm thấy token!");
            }
        } else {
            logger.warn("[WebSocket] Không phải yêu cầu ServletServerHttpRequest!");
        }

        return false;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                               WebSocketHandler wsHandler, Exception exception) {
        logger.info("[WebSocket] Hoàn tất bắt tay WebSocket.");
    }

    private String extractTokenFromCookies(Cookie[] cookies) {
        if (cookies == null) return null;
        for (Cookie cookie : cookies) {
            if ("sessionToken".equals(cookie.getName())) {
                logger.info("[WebSocket] Đã tìm thấy cookie sessionToken.");
                return cookie.getValue();
            }
        }
        logger.warn("[WebSocket] Không tìm thấy cookie sessionToken.");
        return null;
    }
}
