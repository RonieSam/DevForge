package com.spring.devforge.orgainzation;

import java.util.List;

import com.spring.devforge.membership.Membership;
import com.spring.devforge.membership.MembershipData;
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
	public OrgInfo(long id,String name ,String slug, String owner, List<MembershipData> members,
			List<RequestData> requests, List<ProjectInfo> projects) {
		super();
		this.id = id;
		this.name=name;
		this.slug = slug;
		this.owner = owner;
		this.members = members;
		this.requests = requests;
		this.projects = projects;
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
