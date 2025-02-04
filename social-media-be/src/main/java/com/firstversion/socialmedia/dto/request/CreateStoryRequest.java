package com.firstversion.socialmedia.dto.request;

import com.firstversion.socialmedia.dto.BaseDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
public class CreateStoryRequest extends BaseDTO {
    private MultipartFile content;
    private String type;
}
