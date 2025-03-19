package com.firstversion.socialmedia.component.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

/**
 * Bộ chặn tin nhắn WebSocket để kiểm tra quyền truy cập trước khi gửi tin nhắn.
 * <p>
 * Người dùng có thể đã xác thực và kết nối thành công với WebSocket,
 * nhưng chỉ một số kênh hoặc hành động trong ứng dụng phù hợp với quyền của họ.
 * {@link ChannelInterceptor} cho phép kiểm tra quyền chi tiết này trước khi gửi tin nhắn.
 * </p>
 */
@Component
@RequiredArgsConstructor
public class AuthChannelInterceptor implements ChannelInterceptor {

    /**
     * Kiểm tra quyền truy cập của người dùng trước khi tin nhắn được gửi qua kênh.
     *
     * @param message Tin nhắn được gửi.
     * @param channel Kênh đích của tin nhắn.
     * @return Tin nhắn nếu hợp lệ, hoặc {@code null} nếu bị từ chối.
     */
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        String userRole = getUserRoleFromMessage(message);

        // Kiểm tra xem người dùng có quyền gửi tin nhắn không
        if (!isUserAuthorized(userRole, message)) {
            System.err.println("Người dùng không có quyền gửi tin nhắn: " + message.getPayload());
            return null; // Từ chối tin nhắn nếu không có quyền
        }

        // Ghi log tin nhắn trước khi gửi
        System.out.println("Chuẩn bị gửi tin nhắn: " + message.getPayload());

        return message; // Tiếp tục gửi tin nhắn nếu hợp lệ
    }

    /**
     * Lấy vai trò của người dùng từ tin nhắn.
     * <p>
     * Phương thức này có thể được mở rộng để lấy thông tin vai trò từ headers,
     * principal, hoặc các thuộc tính khác của tin nhắn.
     * </p>
     *
     * @param message Tin nhắn WebSocket.
     * @return Vai trò của người dùng (ví dụ: "user", "admin").
     */
    private String getUserRoleFromMessage(Message<?> message) {
        return "user"; // Trả về vai trò mặc định
    }

    /**
     * Kiểm tra xem người dùng có quyền gửi tin nhắn hay không.
     * <p>
     * Có thể mở rộng phương thức này để kiểm tra quyền đối với từng kênh hoặc loại tin nhắn cụ thể.
     * </p>
     *
     * @param userRole Vai trò của người dùng.
     * @param message  Tin nhắn cần kiểm tra.
     * @return {@code true} nếu người dùng có quyền, ngược lại {@code false}.
     */
    private boolean isUserAuthorized(String userRole, Message<?> message) {
        return true; // Mặc định cho phép tất cả
    }
}
