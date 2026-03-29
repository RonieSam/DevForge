package com.spring.devforge.authentication;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	UserDataJpa repo;
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Users user=repo.findByEmail(email);
		if(user==null)throw new UsernameNotFoundException("Account does not exisit");
		return new User(
				user.getEmail(),
				user.getPassword(),
				new ArrayList<>()
		);
	}

}
