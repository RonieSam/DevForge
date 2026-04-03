package com.spring.devforge.comment;


public class CommentMapper {
	public static CommentData toData(Comments  com) {
//		public CommentData(long id, String content, String username,LocalDateTime createdAt,String msg) {

		return new CommentData(
				com.getId(),
				com.getContent(),
				com.getUser().getUsername(),
				com.getCreatedAt()
		);
	}
}
