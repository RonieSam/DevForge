package com.spring.devforge.membership;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.devforge.orgainzation.Organization;


public interface MembershipDataJpa extends JpaRepository<Membership,Long> {
	public boolean existsByUserIdAndOrgId(long userId,long orgId);
	@Query("SELECT m FROM Membership m JOIN FETCH m.user WHERE m.org.id=:orgId AND m.user.id=:userId")
	public Membership findByUserIdAndOrgId(@Param("userId")long userId,@Param("orgId")long orgId);
	public void deleteAllByOrgId(long orgId);
	
	@Query("SELECT m FROM Membership m JOIN FETCH m.user WHERE m.org.id=:orgId")
	public List<Membership> findAllByOrgId(@Param("orgId")long orgId);
	
	@Query("SELECT m.org FROM Membership m where m.user.id=:userId")
	public List<Organization> findAllByUserId(@Param("userId")long userId);

}
