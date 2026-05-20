package com.spring.devforge.messages;

import com.spring.devforge.authentication.Users;
import com.spring.devforge.project.Project;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Message {
	@Id @GeneratedValue
	long id;
	String content;
	@ManyToOne(fetch=FetchType.LAZY)
	Users sender;
	@ManyToOne(fetch=FetchType.LAZY)
	Project project;
	public long getId() {
		return id;
	}
	public String getContent() {
		return content;
	}
	public Users getSender() {
		return sender;
	}
	public Project getProject() {
		return project;
	}
	public Message(String content, Users sender, Project project) {
		super();
		this.content = content;
		this.sender = sender;
		this.project = project;
	}
	
	public Message() {}
}
