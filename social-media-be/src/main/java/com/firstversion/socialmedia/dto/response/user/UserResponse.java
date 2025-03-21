package com.firstversion.socialmedia.dto.response.user;

import com.firstversion.socialmedia.dto.BaseDTO;
import com.firstversion.socialmedia.model.enums.UserStatus;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UserResponse extends BaseDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    private String imageUrl;
    private List<FollowUserResponse> followerList;
    private List<FollowUserResponse> followingList;
    private UserStatus userStatus;
}
