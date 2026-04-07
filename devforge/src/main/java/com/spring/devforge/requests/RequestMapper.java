package com.spring.devforge.requests;



public class RequestMapper {
//	
	public static RequestData toData(Request r) {
		return new RequestData(
				r.getId(),
				r.getUser().getUsername(),
				r.getStatus(),
				r.getReviewdAt(),
				r.getReviewedBy()==null?"":r.getReviewedBy().getUsername(),
				r.getReviewdAt(),
				r.getMsg()
		);
	}
}
