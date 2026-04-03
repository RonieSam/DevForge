package com.spring.devforge.authentication;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class Users {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank(message="Username cannot be blank") @Size(min=3,max=15,message="Username must be within 3 to 15 characters")
	private String username;
	@Email(message="Email is not a valid") 
	private String email;
	@Size(min=8,message="Passwors should have atleast 8 characters") 
	private String password;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	
	public Users() {
		
	}
	
	public Users(String username, String email, String password) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
	}
	
	
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public Long getId() {
		return id;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	@PrePersist
	public void onCreation() {
		this.createdAt=LocalDateTime.now();
	}
	
	@PreUpdate
	public void onUpdate() {
		this.updatedAt=LocalDateTime.now();
	}
}
