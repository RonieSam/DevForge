package com.spring.devforge.orgainzation;

import com.spring.devforge.membership.Membership;
import com.spring.devforge.permissions.RolePermissions;

public class OrgMapper {
//	public OrgData(String slug, String name, int id, String owner) {

	public static OrgData toData(Organization org) {
		return new OrgData(
					org.getSlug(),
					org.getName(),
					org.getId(),
					org.getOwner().getUsername()
				);
	}
	public static UserOrgData toData(Membership mem) {
		return new UserOrgData(
					mem.getOrg().getSlug(),
					mem.getOrg().getName(),
					mem.getOrg().getId(),
					mem.getOrg().getOwner().getUsername(),
					RolePermissions.getPermissions(mem.getRole())
				);
	}
}
