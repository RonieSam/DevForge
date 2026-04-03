package com.spring.devforge.orgainzation;

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
}
