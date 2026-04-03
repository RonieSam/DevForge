package com.spring.devforge.orgainzation;

import org.springframework.data.jpa.repository.JpaRepository;


public interface OrgDataJpa extends JpaRepository<Organization, Long> {
	
	public boolean existsBySlug(String slug);
	public Organization findBySlug(String slug);


}
