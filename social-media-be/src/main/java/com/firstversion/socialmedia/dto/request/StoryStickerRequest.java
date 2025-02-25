package com.firstversion.socialmedia.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class StoryStickerRequest {
    private Long stickerId;
    private float positionX;
    private float positionY;
    private float scale;
    private float rotation;
}

