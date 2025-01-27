package com.firstversion.socialmedia.dto.response.story;

import com.firstversion.socialmedia.model.entity.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StoryResponse {
    private Long id;
    private User user;
    private String contentUrl;
    private String type;
    private LocalDateTime expiredAt;
}
