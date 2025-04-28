package com.firstversion.socialmedia.component.jwt;

import com.firstversion.socialmedia.model.entity.User;
import com.firstversion.socialmedia.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

/**
 * Bộ lọc xác thực JWT được thực thi một lần trên mỗi request.
 * <p>
 * - Trích xuất token từ header `Authorization`.
 * - Kiểm tra tính hợp lệ của token.
 * - Nếu hợp lệ, lấy thông tin người dùng và đặt vào SecurityContext.
 */
@Slf4j
public class AuthTokenFilter extends OncePerRequestFilter {

    private final UserService userService;
    private final JwtUtils jwtUtils;


    public AuthTokenFilter(UserService userService, JwtUtils jwtUtils) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    /**
     * Xử lý xác thực JWT cho mỗi request.
     * <p>
     * - Trích xuất token từ request.
     * - Kiểm tra tính hợp lệ của token.
     * - Nếu token hợp lệ, lấy username và đặt vào SecurityContext.
     *
     * @param request     HTTP request hiện tại.
     * @param response    HTTP response.
     * @param filterChain Chuỗi bộ lọc tiếp theo.
     * @throws ServletException nếu có lỗi Servlet.
     * @throws IOException      nếu có lỗi I/O.
     */
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        System.out.println("hello");
        try {
            parseJwtFromRequest(request).ifPresent(jwt -> {
                if (jwtUtils.validateToken(jwt)) {
                    String username = jwtUtils.extractUsername(jwt);
                    if (SecurityContextHolder.getContext().getAuthentication() == null) {
                        User userDetails = (User) userService.loadUserByUsername(username);
                        UsernamePasswordAuthenticationToken authenticationToken =
                                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                        // Gán chi tiết xác thực vào SecurityContext để sử dụng trong toàn bộ request
                        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    }
                }
            });
        } catch (Exception e) {
            log.error("Không thể xác thực người dùng: {}", e.getMessage());
        }
        filterChain.doFilter(request, response);
    }

    /**
     * Trích xuất token từ HTTP request.
     *
     * @param request HTTP request.
     * @return {@link Optional} chứa token nếu có, ngược lại trả về {@code Optional.empty()}.
     */
    private Optional<String> parseJwtFromRequest(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (StringUtils.hasText(header) && header.startsWith("Bearer ")) {
            return Optional.of(header.substring(7));
        }
        return Optional.empty();
    }

    private boolean isPermitUrl(String path) {
        return false;
//        return permitUrls.stream().anyMatch(path::startsWith);
    }
}
