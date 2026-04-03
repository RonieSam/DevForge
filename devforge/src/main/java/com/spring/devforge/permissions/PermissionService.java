package com.spring.devforge.permissions;


import java.nio.file.AccessDeniedException;

import org.springframework.stereotype.Service;

import com.spring.devforge.membership.Role;

@Service
public class PermissionService {
	
	public boolean hasPermission(Role role,Permissions perms) {
		return (RolePermissions.getPermissions(role).contains(perms));
	}
	public void checkPermissions(Role role,Permissions perms) throws AccessDeniedException {
		if(hasPermission(role,perms))return;
		else throw new AccessDeniedException("User does not have enough permissions");
		
	}
	
	public void isDenied(Role requester,Role user) throws AccessDeniedException {
		if(requester==null||requester==Role.USER||(requester==Role.ADMIN&&(user==Role.OWNER||user==Role.ADMIN))) throw new AccessDeniedException("User cannot accept roles of the same level");
		else return;
		
	}
	
}
