package com.spring.devforge.comment;

import java.time.LocalDateTime;

import com.spring.devforge.authentication.Users;
import com.spring.devforge.project.Project;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

//id
//taskId
//userId
//content
//createdAt

@Entity
public class Comments {
		@Id @GeneratedValue
		private Long id;
		
		@ManyToOne(fetch=FetchType.LAZY) @NotNull
		private Project proj;
		@ManyToOne(fetch=FetchType.LAZY) @NotNull
		private Users user;
		@NotBlank @Size(max=500,message="Comment cannot exceed 500 characters")
		private String content;
		private LocalDateTime createdAt;
		public Long getId() {
			return id;
		}
		
		
		public Project getProj() {
			return proj;
		}
		
		public Users getUser() {
			return user;
		}
		
		public String getContent() {
			return content;
		}
	
		public LocalDateTime getCreatedAt() {
			return createdAt;
		}
		
		@PrePersist
		public void atCreation() {
			this.createdAt = LocalDateTime.now();
		}
		public Comments(@NotNull Project proj, @NotNull Users user, @NotBlank String content) {
			super();
			this.proj = proj;
			this.user = user;
			this.content = content;
		}
		
		public Comments() {}
		
}
