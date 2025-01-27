package com.firstversion.socialmedia.dto.response.reels;

import com.firstversion.socialmedia.dto.BaseDTO;
import com.firstversion.socialmedia.dto.response.user.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReelsResponse extends BaseDTO {
    private Long id;
    private String title;
    private String video;
    private int likes;
    private int views;
    private UserResponse userResponse;
}
