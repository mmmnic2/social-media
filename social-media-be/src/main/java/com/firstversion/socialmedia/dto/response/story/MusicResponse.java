package com.firstversion.socialmedia.dto.response.story;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class MusicResponse {
    private Long id;
    private String title;
    private String artist;
    private String thumbnailUrl;
    private String fileUrl;
}

