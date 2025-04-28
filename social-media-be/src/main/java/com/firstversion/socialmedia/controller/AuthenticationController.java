package com.firstversion.socialmedia.controller;

import com.firstversion.socialmedia.dto.request.CreateUserRequest;
import com.firstversion.socialmedia.dto.request.LoginRequest;
import com.firstversion.socialmedia.dto.response.authenticate.AuthenticationResponse;
import com.firstversion.socialmedia.dto.response.user.UserResponse;
import com.firstversion.socialmedia.exception.AlreadyExistException;
import com.firstversion.socialmedia.service.AuthService;
import com.firstversion.socialmedia.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

/**
 * Controller xử lý xác thực người dùng bao gồm đăng ký và đăng nhập.
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthService authService;

    /**
     * API đăng ký tài khoản mới.
     *
     * @param createUserRequest Dữ liệu đăng ký người dùng.
     * @return Trả về thông tin người dùng nếu đăng ký thành công hoặc thông báo lỗi nếu tài khoản đã tồn tại.
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody CreateUserRequest createUserRequest) {
        try {
            UserResponse response = authService.register(createUserRequest);
            return ResponseEntity.ok(response);
        } catch (AlreadyExistException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    /**
     * API xác thực đăng nhập.
     *
     * @param loginRequest Thông tin đăng nhập gồm email và mật khẩu.
     * @return Trả về JWT token nếu đăng nhập thành công, hoặc lỗi nếu thông tin không chính xác.
     */
    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            AuthenticationResponse response = authService.authenticate(loginRequest);
            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Tên người dùng hoặc mật khẩu không hợp lệ.");
        }
    }
}
