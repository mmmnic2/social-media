package com.firstversion.socialmedia.repository;

import com.firstversion.socialmedia.model.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    @Query("Select n from Notification n where n.receiver.id = :receiverId")
    List<Notification> findByReceiver(Long receiverId);
}
