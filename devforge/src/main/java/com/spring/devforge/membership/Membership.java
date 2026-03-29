package com.spring.devforge.membership;

import java.time.LocalDateTime;

import com.spring.devforge.authentication.Users;
import com.spring.devforge.orgainzation.Organization;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
		uniqueConstraints=@UniqueConstraint(columnNames= {"user_id","org_id"})
		)
public class Membership {
	@Id @GeneratedValue
	private Integer id;
	@ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="user_id")
	private Users user;
	@ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="org_id")
	private Organization org;
	@Enumerated(EnumType.STRING)
	private Role role;
	private LocalDateTime joinedAt;
	
	
	public Membership() {
		
	}
	
	public Membership(Users user, Organization org, Role role) {
		super();
		this.user = user;
		this.org = org;
		this.role = role;
	}


	public LocalDateTime getJoinedAt() {
		return joinedAt;
	}


	@PrePersist
	public void setJoinedAt() {
		this.joinedAt = LocalDateTime.now();
	}



	public Integer getId() {
		return id;
	}



	public Users getUser() {
		return user;
	}



	public Organization getOrg() {
		return org;
	}



	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}




}
