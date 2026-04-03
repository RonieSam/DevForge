package com.spring.devforge.requests;

import jakarta.validation.constraints.NotNull;

public class RequestReviewDto {
	
		RequestStatus status;
		
		public RequestReviewDto(RequestStatus status) {
			super();
			this.status=status;
		}
		
		public RequestStatus getStatus() {
			return status;
		}
		
		
}

