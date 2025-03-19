package com.firstversion.socialmedia.component.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Xử lý các lỗi xác thực JWT. Khi người dùng truy cập vào tài nguyên cần xác thực nhưng không có token hợp lệ,
 * phương thức này sẽ trả về HTTP 401 Unauthorized với thông tin lỗi chi tiết dưới dạng JSON.
 */
@Slf4j
@Component
public class JwtAuthEntryPoint implements AuthenticationEntryPoint {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Được gọi khi một request không có quyền truy cập vào tài nguyên yêu cầu.
     *
     * @param request       HttpServletRequest chứa thông tin yêu cầu.
     * @param response      HttpServletResponse để gửi phản hồi.
     * @param authException Ngoại lệ xác thực, chứa thông tin về lỗi.
     * @throws IOException      Nếu có lỗi khi ghi dữ liệu ra response.
     * @throws ServletException Nếu có lỗi servlet xảy ra.
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {

        log.error("Unauthorized request to: {} - Error: {}", request.getRequestURI(), authException.getMessage());

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        Map<String, Object> body = new HashMap<>();
        body.put("status", HttpServletResponse.SC_UNAUTHORIZED);
        body.put("error", "Unauthorized");
        body.put("message", authException.getMessage());
        body.put("path", request.getServletPath());

        objectMapper.writeValue(response.getOutputStream(), body);
    }
}
