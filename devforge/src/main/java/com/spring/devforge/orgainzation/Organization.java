package com.spring.devforge.orgainzation;

import java.time.LocalDateTime;
import java.util.List;

import com.spring.devforge.authentication.Users;
import com.spring.devforge.membership.Membership;
import com.spring.devforge.project.Project;
import com.spring.devforge.requests.Request;
import com.spring.devforge.task.Tasks;

import jakarta.annotation.Generated;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
	private Long id;
	@NotBlank @Size(min=5)
	private String name;
	@ManyToOne(fetch=FetchType.LAZY) @NotNull @JoinColumn(name="owner_id")
	private Users owner;
	@NotNull
	private String slug;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	@OneToMany(mappedBy="org",cascade=CascadeType.ALL,orphanRemoval=true,fetch=FetchType.LAZY)
	List<Membership> members;
	@OneToMany(mappedBy="org",cascade=CascadeType.ALL,orphanRemoval=true,fetch=FetchType.LAZY)
	List<Project> projects;
	@OneToMany(mappedBy="org",cascade=CascadeType.ALL,orphanRemoval=true,fetch=FetchType.LAZY)
	List<Request> requests;
	
	public Organization() {
		
	}
	
	public Organization(String name, Users owner) {
		super();
		this.name = name;
		this.owner = owner;
	}
	
	
	public Long getId() {
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
