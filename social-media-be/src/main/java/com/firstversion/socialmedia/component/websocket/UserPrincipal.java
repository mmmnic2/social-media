package com.firstversion.socialmedia.component.websocket;

import lombok.AllArgsConstructor;
import lombok.Getter;

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
