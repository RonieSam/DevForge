package com.spring.devforge.orgainzation;

import java.util.List;
import java.util.Set;

import com.spring.devforge.permissions.Permissions;

public class UserOrgData {
	String slug;
	String name;
	long id;
	String owner;
	Set<Permissions> perms;
	
	public Set<Permissions> getPerms(){
		return perms;
	}
	public String getSlug() {
		return slug;
	}
	public String getName() {
		return name;
	}
	public long getId() {
		return id;
	}
	public String getOwner() {
		return owner;
	}
	public UserOrgData(String slug, String name, long id, String owner, Set<Permissions>  perms) {
		super();
		this.slug = slug;
		this.name = name;
		this.id = id;
		this.owner = owner;
		this.perms=perms;
	}
}
