package com.spring.devforge.project;

import java.time.LocalDateTime;
import java.util.List;

import com.spring.devforge.authentication.Users;
import com.spring.devforge.orgainzation.Organization;
import com.spring.devforge.task.Tasks;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


@Entity
@Table(uniqueConstraints= {@UniqueConstraint(columnNames= {"org_id","name"})})
public class Project {
	@Id @GeneratedValue
	private Long id;
	@NotBlank @Size(min=5) 
	private String name;
	@ManyToOne(fetch=FetchType.LAZY) @NotNull @JoinColumn(name="owner_id")
	private Users createdBy;
	@ManyToOne(fetch=FetchType.LAZY) @NotNull @JoinColumn(name="org_id")
	private Organization org;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private LocalDateTime completedAt;
	@Enumerated(EnumType.STRING)
	private ProjectStatus status;
	@OneToMany(mappedBy="project",cascade=CascadeType.ALL,orphanRemoval=true,fetch=FetchType.LAZY)
	List<Tasks> tasks;
	Project(){}
	
	public ProjectStatus getStatus() {
		return status;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Project [id=" + id + ", name=" + name + ", createdBy=" + createdBy + ", org=" + org + ", createdAt="
				+ createdAt + ", updatedAt=" + updatedAt + ", completedAt=" + completedAt + ", status=" + status + "]";
	}

	public Project(@NotBlank @Size(min = 5) String name, @NotNull Users createdBy,@NotNull Organization org) {
		super();
		this.name = name;
		this.createdBy = createdBy;
		this.org=org;
		this.status=ProjectStatus.INPROGRESS;
		this.completedAt=null;
		this.updatedAt=null;
	}
	public Organization getOrg() {
		return org;
	}
	public Long getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public Users getCreatedBy() {
		return createdBy;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}
	public LocalDateTime getCompletedAt() {
		return completedAt;
	}
	
	public void completeProject() {
		this.completedAt=LocalDateTime.now();
		this.status=ProjectStatus.COMPLETED;
	}
	
	@PrePersist
	public void atCreation() {
		this.createdAt=LocalDateTime.now();
	}
	
	public void newUpdate() {
		this.updatedAt=LocalDateTime.now();
	}
}
