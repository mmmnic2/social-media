package com.firstversion.socialmedia.component.websocket;

import com.firstversion.socialmedia.component.jwt.JwtUtils;
import com.firstversion.socialmedia.model.entity.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class CustomHandshakeHandler extends DefaultHandshakeHandler {
    private final JwtUtils jwtUtils;

    @Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler, Map<String, Object> attributes) {
        String token = request.getHeaders().getFirst("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            String jwtToken = token.substring(7);
            try {
                if (jwtUtils.validateToken(jwtToken)) {
                    String email = jwtUtils.extractUsername(jwtToken);
                    Long userId = jwtUtils.extractUserId(jwtToken);
                    //Dùng đoạn code khi có set claims role vào token
//                List<String> roles = extractRolesFromToken(token);
                    return new UserPrincipal(userId, email, List.of("ROLE_USER"));
                }
            } catch (Exception e) {
                // Ghi log hoặc xử lý lỗi nếu có vấn đề với token
                e.printStackTrace();
            }
        }
        return null;
    }
}
