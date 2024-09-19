package com.firstversion.socialmedia.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.List;
// Dùng để lưu thông tin người dùng khi authenticated của websocket

@AllArgsConstructor
public class UserPrincipal implements Principal {
    @Getter
    private final Long userId;
    private final String email;
    @Getter
    private final List<String> roles;
    @Override
    public String getName() {
        return email;
    }
}
