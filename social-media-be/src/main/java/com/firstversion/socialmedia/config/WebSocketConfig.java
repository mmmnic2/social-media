package com.firstversion.socialmedia.config;

import com.firstversion.socialmedia.component.websocket.AuthChannelInterceptor;
import com.firstversion.socialmedia.component.websocket.CustomHandshakeHandler;
import com.firstversion.socialmedia.component.websocket.CustomHandshakeInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * Cấu hình WebSocket với giao thức STOMP.
 * <p>
 * - Xác thực kết nối WebSocket bằng Interceptor.
 * - Cấu hình message broker để xử lý tin nhắn real-time.
 * - Hỗ trợ SockJS cho client không hỗ trợ WebSocket gốc.
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final AuthChannelInterceptor authChannelInterceptor;
    private final CustomHandshakeInterceptor customHandshakeInterceptor;
    private final CustomHandshakeHandler customHandshakeHandler;

    /**
     * Inject các thành phần xác thực WebSocket.
     */
    public WebSocketConfig(AuthChannelInterceptor authChannelInterceptor,
                           CustomHandshakeInterceptor customHandshakeInterceptor,
                           CustomHandshakeHandler customHandshakeHandler) {
        this.authChannelInterceptor = authChannelInterceptor;
        this.customHandshakeInterceptor = customHandshakeInterceptor;
        this.customHandshakeHandler = customHandshakeHandler;
    }

    /**
     * Đăng ký các STOMP endpoint để client kết nối WebSocket.
     *
     * @param registry {@link StompEndpointRegistry}
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setHandshakeHandler(customHandshakeHandler)  // Xử lý bắt tay custom
                .addInterceptors(customHandshakeInterceptor)  // Interceptor kiểm tra auth
                .setAllowedOrigins("https://social-media-two-ecru.vercel.app/")  // Cho phép domain từ frontend
                .withSockJS();  // Hỗ trợ SockJS cho trình duyệt không hỗ trợ WebSocket gốc
    }

    /**
     * Cấu hình message broker cho giao tiếp WebSocket.
     *
     * @param registry {@link MessageBrokerRegistry}
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app"); // Tiền tố cho tin nhắn client gửi lên server
        registry.enableSimpleBroker("/group", "/topic", "/notifications", "/queue"); // Kênh publish-subscribe
        registry.setUserDestinationPrefix("/user"); // Tin nhắn riêng tư giữa người dùng
    }

    /**
     * Cấu hình Interceptor cho kênh inbound để xác thực tin nhắn.
     *
     * @param registration {@link ChannelRegistration}
     */
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(authChannelInterceptor); // Chặn request không hợp lệ
    }
}
