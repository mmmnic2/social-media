package com.firstversion.socialmedia.repository;

import com.firstversion.socialmedia.model.entity.Friendship;
import com.firstversion.socialmedia.model.entity.User;
import com.firstversion.socialmedia.model.enums.FriendshipStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    List<Friendship> findByUserAndStatus(User user, FriendshipStatus status);
    List<Friendship> findByFriendAndStatus(User friend, FriendshipStatus status);
    @Query("Select fs from Friendship fs where fs.user.id = :userId and fs.status = 'ACCEPTED'")
    List<Friendship> getFriendList(Long userId);
    @Query("Select fs from Friendship fs where fs.friend.id = :friendId and fs.status = 'PENDING'")
    List<Friendship> getPendingRequests(Long friendId);
    @Query("Select fs from Friendship fs where fs.friend.id = :friendId and fs.user.id = :userId")
    Optional<Friendship> findByUserAndFriend(Long userId, Long friendId);
    @Query("Select fs from Friendship fs where fs.friend.id = :friendId and fs.user.id = :userId and fs.status = 'PENDING'")
    Optional<Friendship> findByUserAndFriendAndPendingStatus(Long userId, Long friendId);
}
