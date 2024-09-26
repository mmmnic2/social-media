package com.firstversion.socialmedia.service.impl;

import com.firstversion.socialmedia.dto.request.FriendRequest;
import com.firstversion.socialmedia.exception.AccessDeniedException;
import com.firstversion.socialmedia.exception.NotFoundException;
import com.firstversion.socialmedia.model.entity.Friendship;
import com.firstversion.socialmedia.model.entity.User;
import com.firstversion.socialmedia.model.enums.FriendshipStatus;
import com.firstversion.socialmedia.repository.FriendshipRepository;
import com.firstversion.socialmedia.repository.UserRepository;
import com.firstversion.socialmedia.service.FriendshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FriendshipServiceImpl implements FriendshipService {
    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;
    @Override
    public Friendship sendFriendRequest(FriendRequest friendRequest) {
        User foundUser = userRepository.findById(friendRequest.getUserId()).orElseThrow(()-> new NotFoundException("User not found."));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User userLogin = (User) authentication.getPrincipal();
        if(!Objects.equals(foundUser.getId(), userLogin.getId())) throw new AccessDeniedException("User ID in the request does not match the authenticated user.");
        User foundFriend = userRepository.findById(friendRequest.getFriendId()).orElseThrow(()-> new NotFoundException("Friend not found."));
        Friendship friendship = new Friendship();
        friendship.setFriend(foundFriend);
        friendship.setUser(foundUser);
        friendship.setStatus(FriendshipStatus.PENDING);
        return friendshipRepository.save(friendship);
    }

    @Override
    public Friendship respondToFriendRequest(Long friendshipId, FriendshipStatus status) {
        Friendship founded = friendshipRepository.findById(friendshipId).orElseThrow(()-> new NotFoundException("Request not found."));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User userLogin = (User) authentication.getPrincipal();
        if(!Objects.equals(userLogin.getId(), founded.getFriend().getId())) throw new AccessDeniedException("User ID in the request does not match the authenticated user.");
        founded.setStatus(status);
        return friendshipRepository.save(founded);
    }

    @Override
    public List<Friendship> getPendingRequests() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User userLogin = (User) authentication.getPrincipal();
        return friendshipRepository.getPendingRequests(userLogin.getId());
    }


}
