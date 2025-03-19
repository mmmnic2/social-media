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

/**
 * Bộ chặn (Interceptor) để xác thực WebSocket thông qua JWT token từ cookie trước khi bắt tay (handshake).
 * <p>
 * Mục tiêu chính:
 * - Trích xuất JWT từ cookie "sessionToken".
 * - Xác thực token và lấy thông tin người dùng.
 * - Cấp quyền cho người dùng thông qua SecurityContextHolder.
 * </p>
 */
@Component
@RequiredArgsConstructor
public class CustomHandshakeInterceptor implements HandshakeInterceptor {
    private final JwtUtils jwtUtils;
    private final UserService userService;

    /**
     * Xác thực JWT trước khi thực hiện bắt tay WebSocket.
     * <p>
     * - Lấy token từ cookie "sessionToken".
     * - Xác thực token.
     * - Nếu hợp lệ, thiết lập thông tin người dùng vào SecurityContextHolder.
     * </p>
     *
     * @param request    Yêu cầu HTTP từ client.
     * @param response   Phản hồi HTTP từ server.
     * @param wsHandler  WebSocketHandler xử lý kết nối.
     * @param attributes Thuộc tính của kết nối WebSocket.
     * @return {@code true} nếu xác thực thành công, {@code false} nếu thất bại.
     * @throws Exception Nếu có lỗi trong quá trình xử lý.
     */
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        if (request instanceof ServletServerHttpRequest servletRequest) {
            HttpServletRequest httpRequest = servletRequest.getServletRequest();
            Cookie[] cookies = httpRequest.getCookies();

            String token = extractTokenFromCookies(cookies);

            // Kiểm tra và xác thực token
            if (token != null && jwtUtils.validateToken(token)) {
                String username = jwtUtils.extractUsername(token);
                User userDetails = (User) userService.loadUserByUsername(username);

                // Thiết lập SecurityContextHolder
                SecurityContextHolder.getContext().setAuthentication(
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities())
                );

                return true;
            }
        }
        return false;
    }

    /**
     * Xử lý sau khi bắt tay WebSocket. (Không cần thực hiện hành động cụ thể)
     *
     * @param request   Yêu cầu HTTP từ client.
     * @param response  Phản hồi HTTP từ server.
     * @param wsHandler WebSocketHandler xử lý kết nối.
     * @param exception Ngoại lệ nếu có lỗi xảy ra trong quá trình bắt tay.
     */
    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {
        // Không cần xử lý gì sau handshake
    }

    /**
     * Trích xuất token JWT từ danh sách cookie.
     *
     * @param cookies Mảng cookie từ yêu cầu HTTP.
     * @return Chuỗi token JWT nếu tồn tại, nếu không trả về {@code null}.
     */
    private String extractTokenFromCookies(Cookie[] cookies) {
        if (cookies == null) return null;
        for (Cookie cookie : cookies) {
            if ("sessionToken".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }
}
