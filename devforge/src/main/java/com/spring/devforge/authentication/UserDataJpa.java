package com.spring.devforge.authentication;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDataJpa extends JpaRepository <Users,Long>{
	
	public Users findByEmail(String email);
	public Users findByUsername(String username);

}
