package com.spring.devforge.orgainzation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface OrgDataJpa extends JpaRepository<Organization, Long> {
	
	public boolean existsBySlug(String slug);
	public Organization findBySlug(String slug);
	public List<Organization> findAllBySlugStartingWith(String prefix);

}
