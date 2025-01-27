package com.firstversion.socialmedia.dto.request;

import com.firstversion.socialmedia.dto.BaseDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@NoArgsConstructor
public class CreateReelRequest extends BaseDTO {
    private String caption;
    private MultipartFile video;
}
