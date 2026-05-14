package com.spring.devforge.project;

import java.time.LocalDateTime;
import java.util.List;

import com.spring.devforge.authentication.Users;
import com.spring.devforge.comment.Comments;
import com.spring.devforge.logs.ProjectLogs;
import com.spring.devforge.orgainzation.Organization;
import com.spring.devforge.task.Tasks;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
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
	private String description;
	@ElementCollection
	private List<String> stack;
	private String github;
	@OneToMany(mappedBy="proj",cascade=CascadeType.ALL,orphanRemoval=true,fetch=FetchType.LAZY)
	List<Comments> comments;
	@OneToMany(mappedBy="proj",cascade=CascadeType.ALL,orphanRemoval=true,fetch=FetchType.LAZY)
	List<ProjectLogs> logs;
	public String getDescription() {
		return description;
	}



	public List<Comments> getComments() {
		return comments;
	}



	public List<ProjectLogs> getLogs() {
		return logs;
	}

	@OneToMany(mappedBy="project",cascade=CascadeType.ALL,orphanRemoval=true,fetch=FetchType.LAZY)
	List<Tasks> tasks;
	Project(){}
	
	

	public void setName(String name) {
		this.name = name;
	}

	

	public void setDesc(String desc) {
		this.description = desc;
	}



	public void setStack(List<String> stack) {
		this.stack = stack;
	}



	public void setGithub(String github) {
		this.github = github;
	}



	public Project(@NotBlank @Size(min = 5) String name, @NotNull Users createdBy,@NotNull Organization org,@NotNull String desc,List<String> stack,String github) {
		super();
		this.name = name;
		this.createdBy = createdBy;
		this.org=org;
		this.description=desc;
		this.stack=stack;
		this.github=github;
		
	}
	
	
	public String getDesc() {
		return description;
	}



	public List<String> getStack() {
		return stack;
	}



	public String getGithub() {
		return github;
	}



	public List<Tasks> getTasks() {
		return tasks;
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

	@PrePersist
	public void atCreation() {
		this.createdAt=LocalDateTime.now();
	}
	
	
}
