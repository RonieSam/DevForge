package com.spring.devforge.orgainzation;

import java.util.List;
import java.util.Set;

import com.spring.devforge.membership.Membership;
import com.spring.devforge.membership.MembershipData;
import com.spring.devforge.permissions.Permissions;
import com.spring.devforge.project.ProjectInfo;
import com.spring.devforge.requests.RequestData;

public class OrgInfo {
	long id;
	String name;
	String slug;
	String owner;
	List<MembershipData> members;
	List<RequestData> requests;
	List<ProjectInfo> projects;
	Set<Permissions> perms;
	
	public OrgInfo(long id,String name ,String slug, String owner, List<MembershipData> members,
			List<RequestData> requests, List<ProjectInfo> projects,Set<Permissions> perms) {
		super();
		this.id = id;
		this.name=name;
		this.slug = slug;
		this.owner = owner;
		this.members = members;
		this.requests = requests;
		this.projects = projects;
		this.perms=perms;
	}
	public Set<Permissions> getPerms(){
		return perms;
	}
	public long getId() {
		return id;
	}
	public String getSlug() {
		return slug;
	}
	public String getOwner() {
		return owner;
	}
	public List<MembershipData> getMembers() {
		return members;
	}
	public List<RequestData> getRequests() {
		return requests;
	}
	public List<ProjectInfo> getProjects() {
		return projects;
	}
	public String getName() {
		return name;
	}
	
	
}
