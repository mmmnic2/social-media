package com.firstversion.socialmedia.model.entity;

import com.firstversion.socialmedia.model.enums.FriendshipStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Friendship extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; //người gửi yêu cầu kết bạn
    @ManyToOne
    @JoinColumn(name = "friend_id")
    private User friend; // nugời nhận yêu cầu kết bạn
    @Column
    @Enumerated(EnumType.STRING)
    private FriendshipStatus status;

}
