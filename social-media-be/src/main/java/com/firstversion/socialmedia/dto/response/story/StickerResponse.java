package com.firstversion.socialmedia.dto.response.story;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StickerResponse {
    private Long id;
    private String imageUrl;
    private float positionX;
    private float positionY;
    private float scale;
    private float rotation;
}

