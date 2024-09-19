package com.firstversion.socialmedia.component.oauth2;

import com.firstversion.socialmedia.component.jwt.JwtUtils;
import com.firstversion.socialmedia.model.entity.User;
import com.firstversion.socialmedia.repository.UserRepository;
import com.firstversion.socialmedia.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final JwtUtils jwtTokenProvider;
    private final UserService userService;
    @Value("${security.jwt.expirationTime}")
    @Getter
    private long jwtExpirationTime;
    // giai thich: http://localhost:8080/login/oauth2/code/google đây là url callback ở gg cloud console.
    // sau khi login gg success hàm ở bên dưới là onAuthenticationSuccess sẽ được thực hiện.
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        User foundUser = userService.processOAuthPostLogin(oAuth2User);
        // Tạo JWT cho người dùng
        String token = jwtTokenProvider.generateToken(foundUser);
//        response.addHeader("Authorization", "Bearer " + token);
        // Tạo cookie để lưu token
        Cookie jwtCookie = new Cookie("sessionToken", token);
        jwtCookie.setHttpOnly(true); // Tăng cường bảo mật, cookie không thể truy cập bởi JS
        jwtCookie.setMaxAge((int) jwtExpirationTime);
        jwtCookie.setPath("/"); // Đặt đường dẫn cho cookie
        response.addCookie(jwtCookie);

        
        // Gửi JWT về frontend
        response.sendRedirect("http://localhost:3000"); // Chuyển hướng về frontend
    }
}
