package com.firstversion.socialmedia.model.entity;

import com.firstversion.socialmedia.dto.response.story.StoryResponse;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Story extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String contentUrl;
    private String type;
    private LocalDateTime expiredAt;

    public StoryResponse toStoryResponse() {
        StoryResponse response = new StoryResponse();
        response.setId(this.getId());
        response.setUser(this.getUser());
        response.setContentUrl(this.getContentUrl());
        response.setType(this.getType());
        response.setExpiredAt(this.getExpiredAt());
        return response;
    }
}
