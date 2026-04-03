package com.spring.devforge.comment;

import java.time.LocalDateTime;

public class CommentData {
	long id;
	String content;
	String username;
	LocalDateTime createdAt;
	public long getId() {
		return id;
	}
	public String getContent() {
		return content;
	}
	public String getUsername() {
		return username;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	
	
	public CommentData(long id, String content, String username,LocalDateTime createdAt) {
		super();
		this.id = id;
		this.content = content;
		this.username = username;
		this.createdAt=createdAt;
	}
}
