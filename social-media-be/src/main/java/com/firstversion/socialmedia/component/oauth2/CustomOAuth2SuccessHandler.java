package com.firstversion.socialmedia.component.oauth2;

import com.firstversion.socialmedia.component.jwt.JwtUtils;
import com.firstversion.socialmedia.model.entity.User;
import com.firstversion.socialmedia.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Xử lý sự kiện đăng nhập thành công bằng OAuth2.
 * Khi người dùng đăng nhập thành công bằng Google hoặc một nhà cung cấp OAuth2 khác,
 * Spring Security sẽ kích hoạt handler này để tạo JWT và gửi về frontend.
 */
@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtils jwtTokenProvider;
    private final UserService userService;

    @Value("${security.jwt.expirationTime}")
    @Getter
    private long jwtExpirationTime;

    /**
     * Xử lý khi đăng nhập thành công bằng OAuth2.
     * <p>
     * - Lấy thông tin từ OAuth2User.<br>
     * - Kiểm tra hoặc tạo người dùng trong hệ thống.<br>
     * - Tạo JWT cho người dùng.<br>
     * - Gửi JWT về frontend bằng cookie.<br>
     * - Chuyển hướng người dùng đến trang chính của frontend.
     * </p>
     *
     * @param request        Yêu cầu HTTP từ người dùng.
     * @param response       Phản hồi HTTP gửi về frontend.
     * @param authentication Đối tượng xác thực chứa thông tin người dùng đăng nhập.
     * @throws IOException      Nếu có lỗi xảy ra khi gửi phản hồi.
     * @throws ServletException Nếu có lỗi servlet xảy ra.
     */
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        // Xử lý đăng nhập và lấy hoặc tạo người dùng trong hệ thống
        User foundUser = userService.processOAuthPostLogin(oAuth2User);

        // Tạo JWT cho người dùng
        String token = jwtTokenProvider.generateToken(foundUser);

        // Tạo cookie để lưu token, tăng cường bảo mật bằng HttpOnly
        Cookie jwtCookie = new Cookie("sessionToken", token);
        jwtCookie.setHttpOnly(true); // Ngăn JavaScript truy cập cookie
        jwtCookie.setMaxAge((int) jwtExpirationTime); // Thiết lập thời gian hết hạn
        jwtCookie.setPath("/"); // Cookie áp dụng cho toàn bộ ứng dụng
        response.addCookie(jwtCookie);

        // Chuyển hướng về frontend sau khi đăng nhập thành công
        response.sendRedirect("http://localhost:3000");
    }
}
