package com.spring.devforge.authentication;

public class AuthMapper {
	public static AuthData toData(Users u) {

		return new AuthData(
					u.getId(),
					u.getFirstName(),
					u.getLastName(),
					u.getUsername(),
					u.getEmail()
				);
	}
}
