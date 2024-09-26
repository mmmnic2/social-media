package com.firstversion.socialmedia.component.websocket;

import com.firstversion.socialmedia.component.jwt.JwtUtils;
import com.firstversion.socialmedia.model.entity.User;
import com.firstversion.socialmedia.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class CustomHandshakeInterceptor implements HandshakeInterceptor {
    private final JwtUtils jwtUtils;
    private final UserService userService;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        if (request instanceof ServletServerHttpRequest) {
            HttpServletRequest servletRequest = ((ServletServerHttpRequest) request).getServletRequest();
            Cookie[] cookies = servletRequest.getCookies();

            String token = null;
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if (cookie.getName().equals("sessionToken")) {
                        token = cookie.getValue();
                        break;
                    }
                }
            }

            // Xác thực token
            if (token != null && jwtUtils.validateToken(token)) {
                String username = jwtUtils.extractUsername(token); // Giả sử có service validate token
                User userDetails = (User) userService.loadUserByUsername(username);
                // Set vào SecurityContextHolder để xác thực
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
                return true;
            } else return false; // Không tìm thấy token
        }
        return false;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {

    }
}
