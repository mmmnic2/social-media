package com.firstversion.socialmedia.dto.response.story;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class TextResponse {
    private String content;
    private float positionX;
    private float positionY;
    private String color;
    private float fontSize;
}