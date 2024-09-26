package com.firstversion.socialmedia.service;

import com.firstversion.socialmedia.dto.request.FriendRequest;
import com.firstversion.socialmedia.model.entity.Friendship;
import com.firstversion.socialmedia.model.enums.FriendshipStatus;

import java.util.List;

public interface FriendshipService {
    Friendship sendFriendRequest(FriendRequest friendRequest);
    Friendship respondToFriendRequest(Long friendshipId, FriendshipStatus status);
    List<Friendship> getPendingRequests();

}
