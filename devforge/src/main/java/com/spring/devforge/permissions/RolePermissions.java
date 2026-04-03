package com.spring.devforge.permissions;

import java.util.Set;
import static com.spring.devforge.permissions.Permissions.*;
import com.spring.devforge.membership.Role;

public class RolePermissions {
	public static Set<Permissions> getPermissions(Role role){
		 switch(role) {
		case OWNER: return Set.of(
				ORGANIZATION_UPDATE,
				ORGAINZATION_DELETE,
				
				MEMBER_ADD,
				MEMBER_REMOVE,
				MEMBER_ROLE_UPDATE,
				
				PROJECT_CREATE,
				PROJECT_UPDATE,
				PROJECT_DELETE,
				
				REQUEST_APPROVE,
				REQUEST_DELETE,
				
				TASK_CREATE,
				TASK_UPDATE,
				TASK_DELETE,
				TASK_STATUS_UPDATE,
				TASK_REASSIGN,
				
				COMMENT_CREATE,
				COMMENT_DELETE

				

		);
		case ADMIN: return Set.of(
				ORGANIZATION_UPDATE,
				
				MEMBER_ADD,
				MEMBER_REMOVE,
				
				PROJECT_CREATE,
				PROJECT_UPDATE,
				
				REQUEST_APPROVE,
				REQUEST_DELETE,
				
				TASK_CREATE,
				TASK_UPDATE,
				TASK_DELETE,
				TASK_STATUS_UPDATE,
				TASK_REASSIGN,
				
				COMMENT_CREATE,
				COMMENT_DELETE

				
				
		);
		case USER: return Set.of(
				TASK_STATUS_UPDATE
		);
		default:throw new IllegalArgumentException("Unknown role: " + role);
		 }
	}

}