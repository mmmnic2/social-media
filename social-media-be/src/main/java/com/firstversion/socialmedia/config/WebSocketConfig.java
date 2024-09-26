package com.firstversion.socialmedia.config;

import com.firstversion.socialmedia.component.websocket.AuthChannelInterceptor;
import com.firstversion.socialmedia.component.websocket.CustomHandshakeHandler;
import com.firstversion.socialmedia.component.websocket.CustomHandshakeInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Autowired
    AuthChannelInterceptor authChannelInterceptor;
    @Autowired
    CustomHandshakeInterceptor customHandshakeInterceptor;
    @Autowired
    CustomHandshakeHandler customHandshakeHandler;
    // đăng ký một websocket endpoint mà các máy khác sẽ sử dụng để kết nối với máy chủ websocket.
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setHandshakeHandler(customHandshakeHandler)
                .addInterceptors(customHandshakeInterceptor)
                .setAllowedOrigins("http://localhost:3000")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Định nghĩa prefix cho các tin nhắn đến từ client gửi đến server (thông qua publish)
        registry.setApplicationDestinationPrefixes("/app");
        // Kích hoạt một SimpleBroker với các topic
        registry.enableSimpleBroker("/group","/topic", "/notifications", "/queue");
        // Định nghĩa prefix cho các tin nhắn đến từ server gửi đến client (thông qua subcribe)
        registry.setUserDestinationPrefix("/user");
    }
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        // Đăng ký interceptor để kiểm tra token
        registration.interceptors(authChannelInterceptor);
    }

}
