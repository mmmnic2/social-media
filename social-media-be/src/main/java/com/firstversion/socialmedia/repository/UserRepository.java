package com.firstversion.socialmedia.repository;

import com.firstversion.socialmedia.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    Optional<User> findUserByEmail(String email);

    @Query("select u from User u where u.firstName " +
            "LIKE %:query% or u.lastName LIKE %:query% or u.email LIKE %:query%")
    List<User> searchUser(@Param("query") String query);

    @Query("select u from User u where u.id in (" +
            "select pl.userLike.id from PostLike pl " +
            "where pl.post.id = :postId and pl.isDelete = false)")
    List<User> findListUserLikedByPostId(Long postId);

//    @Query("select u from User u where u.id in (select fs.user.id from Friendship fs " +
//            "where (fs.user.id=:userId or fs.friend.id= :userId) and fs.status='ACCEPTED'")
    // đối với user được gửi kết bạn => user là friend => lấy user và friend.id = userId
    // đối với user tự gửi lời mới kết bạn => user là user => lấy friend và xét điều kiện user.id = userId
    @Query("SELECT u FROM User u WHERE u.id IN (SELECT fs.friend.id FROM Friendship fs " +
            "WHERE fs.user.id = :userId AND fs.status = 'ACCEPTED' " +
            "UNION " +
            "SELECT fs.user.id FROM Friendship fs WHERE fs.friend.id = :userId AND fs.status = 'ACCEPTED')")
    List<User> getFriendList(Long userId);
}
