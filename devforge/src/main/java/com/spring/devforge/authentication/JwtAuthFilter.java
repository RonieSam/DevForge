package com.spring.devforge.authentication;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class JwtAuthFilter extends OncePerRequestFilter{

	@Autowired
	JwtService jwtService;
	
	@Autowired
	UserDetailsService userDetailsService;
	
	
	
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
			String uri=request.getRequestURI();
			if(uri.startsWith("/auth/")) {
			    filterChain.doFilter(request, response);
				return;
			}
			String email=null;
			String token=null;
			if(request.getCookies()!=null) {
				for(Cookie cookie:request.getCookies()) {
					if("token".equals(cookie.getName())) {
						token=cookie.getValue();
					}
				}
			}
			if(token!=null) {
				try{
					email=jwtService.extractEmail(token);
				}
				catch(Exception e) {
					response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		            response.setContentType("application/json");
		            response.getWriter().write("{\"success\":false,\"message\":\"Invalid or expired token\",\"data\":null}");
		            return;
				}
			}
			
			if(email!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
				UserDetails userDetails=userDetailsService.loadUserByUsername(email);
				if(jwtService.validateToken(token, userDetails)) {
					UsernamePasswordAuthenticationToken authToken=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
					authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					SecurityContextHolder.getContext().setAuthentication(authToken);
				}
			}
			
			filterChain.doFilter(request, response);
		
	}

}

	
	
	
	

