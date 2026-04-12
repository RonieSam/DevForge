package com.spring.devforge.orgainzation;

import com.spring.devforge.membership.Membership;
import com.spring.devforge.permissions.RolePermissions;

public class UserOrgMapper {
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
