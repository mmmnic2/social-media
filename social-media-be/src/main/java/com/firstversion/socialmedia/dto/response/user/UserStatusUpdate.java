package com.firstversion.socialmedia.dto.response.user;

import com.firstversion.socialmedia.model.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserStatusUpdate {
    private Long userId;
    private UserStatus userStatus;
    private String firstName;
    private String lastName;
    private String email;
}
