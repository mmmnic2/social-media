package com.firstversion.socialmedia.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class StoryTextRequest {
    private String content;
    private float positionX;
    private float positionY;
    private String color;
    private float fontSize;
}

