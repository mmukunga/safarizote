package com.example.safarizote.controller;

import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.safarizote.model.UserAuth;
import com.example.safarizote.repository.SignInRepository;

//import java.util.stream.Collectors;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.AuthorityUtils;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jws;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;

@RestController
public class SignInController { 
  @Autowired
  private SignInRepository repository;
  
  String secretKey = "MTIzNDU2Nzg=";

    @RequestMapping(value = "/api/findAll",  method={RequestMethod.GET})
    public ResponseEntity<List<UserAuth>> findAll() {
        List<UserAuth> users = repository.findAll();
        System.out.println("Login, the time at the server is now " + new Date());
        System.out.println("findAll() End OK!");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/login",  method={RequestMethod.POST})
    public ResponseEntity<UserAuth> logIn(@RequestBody UserAuth userAuth) {
        UserAuth authedUser = null;
        List<UserAuth> users = repository.findAll();
        for (UserAuth tempUser : users) {
            System.out.println("SignInRepository FROM USER:= " + tempUser);
            System.out.println("SignInRepository FROM DB:= " + userAuth);
            System.out.println("COMPARE1:= " + tempUser.getEmail() + " <> " + userAuth.getEmail());
            System.out.println("COMPARE2:= " + tempUser.getPassword() + " <> " + userAuth.getPassword());

            if (tempUser.getEmail().equals(userAuth.getEmail()) &&
                tempUser.getPassword().equals(userAuth.getPassword()) ) {
                authedUser = tempUser;
                System.out.println("SignInRepository USER FOUND!!:= " + tempUser);
                break;
            }
        }

        String token = getJWTToken(userAuth.getEmail());
        System.out.println("SignInRepository END USER token!:= " + token);
        System.out.println("SignInRepository END USER!:= " + authedUser);
        authedUser.setToken(token);
        System.out.println("SignInRepository END USER tokenized!:= " + authedUser);
        System.out.println("SignInRepository END OK!!");
        return new ResponseEntity<>(authedUser, HttpStatus.OK);
    }

    
    @RequestMapping(value = "/api/verify",  method={RequestMethod.POST})
    public ResponseEntity<Boolean> validateToken(String token, String username) {
		final String tokeUsername = getUsernameFromToken(token);
		return new ResponseEntity<>(tokeUsername.equals(username) && !isTokenExpired(token), HttpStatus.OK);
    }

    private String getJWTToken(String username) {
		//List<GrantedAuthority> grantedAuthorities = AuthorityUtils
		//		.commaSeparatedStringToAuthorityList("ROLE_USER");
		
		String token = Jwts
				.builder()
				.setId("softtekJWT")
				.setSubject(username)
                .claim("authorities", new String[] { "dbuser", "admin" })
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 600000))
				.signWith(SignatureAlgorithm.HS512,
						secretKey.getBytes()).compact();

		return "Bearer " + token;
	}

    public Date getExpirationDateFromToken(String token) {
        Date expiration;
        try {
          final Claims claims = getAllClaimsFromToken(token);
          expiration = claims.getExpiration();
        } catch (Exception e) {
          expiration = null;
        }
        return expiration;
      }

    private Claims getAllClaimsFromToken(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
	}

	private Boolean isTokenExpired(String token) {
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}

    public String getUsernameFromToken(String token) {
        String username;
        try {
          final Claims claims = getAllClaimsFromToken(token);
          username = claims.getSubject();
        } catch (Exception e) {
          username = null;
        }
        return username;
      }

}