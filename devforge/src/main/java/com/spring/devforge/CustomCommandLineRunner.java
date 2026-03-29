package com.spring.devforge;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.spring.devforge.authentication.UserDataJpa;

@Component
public class CustomCommandLineRunner implements CommandLineRunner {

	@Autowired
	UserDataJpa repo;
	@Override
	public void run(String... args) throws Exception {
//		repo.save(new Users(1,"Ronie","ronieroysonsamuel@gmail.com","1234"));
//		repo.save(new Users(2,"Ro","ronieroyson@gmail.com","1234"));
//		repo.save(new Users(3,"Ron","roni@gmail.com","1234"));

	}

}
