package com.spring.devforge.comment;

import java.time.LocalDateTime;

import com.spring.devforge.authentication.Users;
import com.spring.devforge.task.Tasks;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
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
		private Tasks task;
		@ManyToOne(fetch=FetchType.LAZY) @NotNull
		private Users user;
		@NotBlank @Size(max=500,message="Comment cannot exceed 500 characters")
		private String content;
		private LocalDateTime createdAt;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public Tasks getTask() {
			return task;
		}
		public void setTask(Tasks task) {
			this.task = task;
		}
		public Users getUser() {
			return user;
		}
		public void setUser(Users user) {
			this.user = user;
		}
		public String getContent() {
			return content;
		}
		public void setContent(String content) {
			this.content = content;
		}
		public LocalDateTime getCreatedAt() {
			return createdAt;
		}
		public void setCreatedAt(LocalDateTime createdAt) {
			this.createdAt = createdAt;
		}
		public Comments(@NotNull Tasks task, @NotNull Users user, @NotBlank String content) {
			super();
			this.task = task;
			this.user = user;
			this.content = content;
		}
		
		public Comments() {}
		
}
