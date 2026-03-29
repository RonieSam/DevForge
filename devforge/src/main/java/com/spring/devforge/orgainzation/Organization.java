package com.spring.devforge.orgainzation;

import java.time.LocalDateTime;

import com.spring.devforge.authentication.Users;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(
		uniqueConstraints=@UniqueConstraint(columnNames={"owner_id","slug"})
		)
public class Organization {
	
	@Id @GeneratedValue
	private Integer id;
	@NotBlank @Size(min=5)
	private String name;
	@ManyToOne(fetch=FetchType.LAZY) @NotNull @JoinColumn(name="owner_id")
	private Users owner;
	@NotNull
	private String slug;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	
	
	public Organization() {
		
	}
	
	public Organization(String name, Users owner) {
		super();
		this.name = name;
		this.owner = owner;
	}
	
	
	public Integer getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public Users getOwner() {
		return owner;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	
	public void setOwner(Users owner) {
		this.owner=owner;
	}
	
	
	public void setName(String name) {
		this.name = name;
	}


	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}


	@PrePersist
	public void onCreation() {
		this.createdAt=LocalDateTime.now();
	}
	
	@PreUpdate
	public void onUpdate() {
		this.updatedAt=LocalDateTime.now();
	}


	public String getSlug() {
		return slug;
	}
	
	public void setSlug(String slug) {
		this.slug=slug;
	}

	
	
	
}
