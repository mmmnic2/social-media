package com.firstversion.socialmedia.dto.response.story;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class UserStoryResponse {
    private Long id;
    private String username;
    private String avatarUrl;
}
