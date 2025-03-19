package com.firstversion.socialmedia.component.logout;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

/**
 * Dịch vụ xử lý đăng xuất người dùng khỏi hệ thống.
 * Thực hiện việc xóa JWT khỏi header và làm sạch SecurityContext.
 */
@Service
public class HandlerLogoutService implements LogoutHandler {

    /**
     * Xử lý đăng xuất người dùng bằng cách kiểm tra và loại bỏ JWT khỏi request.
     *
     * @param request        Yêu cầu HTTP chứa thông tin xác thực của người dùng.
     * @param response       Phản hồi HTTP gửi về sau khi xử lý đăng xuất.
     * @param authentication Đối tượng xác thực hiện tại của người dùng.
     */
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        final String authHeader = request.getHeader("Authorization");

        // Kiểm tra xem header Authorization có tồn tại và có bắt đầu bằng "Bearer " không
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }

        // Cắt bỏ tiền tố "Bearer " để lấy token JWT
        final String jwt = authHeader.substring(7);

        // Xóa thông tin xác thực khỏi SecurityContext
        SecurityContextHolder.clearContext();
    }
}
