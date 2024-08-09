package com.artistry.artistry.repository;

import com.artistry.artistry.entity.Notification;
import com.artistry.artistry.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUser(Users user);
}
