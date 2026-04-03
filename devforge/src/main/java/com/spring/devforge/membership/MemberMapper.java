package com.spring.devforge.membership;

public class MemberMapper {
	public static MembershipData toData(Membership m) {
		return new MembershipData(
				m.getId(),
				m.getUser().getUsername(),
				m.getRole(),
				m.getOrg().getSlug(),
				m.getJoinedAt()
		);
	}
}
