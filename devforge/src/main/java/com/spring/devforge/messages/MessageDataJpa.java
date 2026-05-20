package com.spring.devforge.messages;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageDataJpa extends JpaRepository<Message,Long> {
		List<Message> findAllByProjectId(long projectId);
}
