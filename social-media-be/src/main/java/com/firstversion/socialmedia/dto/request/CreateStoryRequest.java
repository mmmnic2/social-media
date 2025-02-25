package com.firstversion.socialmedia.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class CreateStoryRequest {
    private MultipartFile content;
    private String mediaType;
    private Long musicId;
    private List<StoryTextRequest> texts;
    private List<StoryStickerRequest> stickers;
}
