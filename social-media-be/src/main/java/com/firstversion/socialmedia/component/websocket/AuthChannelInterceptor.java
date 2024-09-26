package com.firstversion.socialmedia.component.websocket;

import com.firstversion.socialmedia.component.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.core.token.TokenService;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthChannelInterceptor implements ChannelInterceptor {
    // một người dùng có thể đã xác thực và kết nối thành công,
    // nhưng chỉ một số kênh hoặc một số hành động trong ứng dụng là phù hợp với quyền của họ.
    // ChannelInterceptor giúp thực hiện kiểm tra quyền truy cập chi tiết này.

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
//        // Kiểm tra quyền của người dùng trên tin nhắn
        String userRole = getUserRoleFromMessage(message);
        if (!isUserAuthorized(userRole, message)) {
            System.err.println("User not authorized to send message: " + message.getPayload());
            return null; // Từ chối tin nhắn nếu không được phép
        }

        // Ghi log tin nhắn trước khi gửi
        System.out.println("Preparing to send message: " + message.getPayload());



        return message; // Tiếp tục gửi tin nhắn nếu hợp lệ
    }

    private String getUserRoleFromMessage(Message<?> message) {
        // Lấy vai trò của người dùng từ tin nhắn hoặc từ các thuộc tính khác
        // Ví dụ: từ headers hoặc từ principal
        return "user"; // Ví dụ, trả về vai trò người dùng
    }

    private boolean isUserAuthorized(String userRole, Message<?> message) {
        // Kiểm tra quyền truy cập của người dùng trên tin nhắn
        // Ví dụ: kiểm tra quyền đối với kênh hoặc loại tin nhắn
        return true; // Ví dụ, trả về quyền truy cập hợp lệ
    }
}
