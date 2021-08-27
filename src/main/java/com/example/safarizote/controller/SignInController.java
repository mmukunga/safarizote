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
            System.out.println("SignInRepository logIn() FROM USER:= " + tempUser);
            System.out.println("SignInRepository logIn() FROM DB:= " + userAuth);
            System.out.println("COMPARE1:= " + tempUser.getEmail() + " <> " + userAuth.getEmail());
            System.out.println("COMPARE2:= " + tempUser.getPassword() + " <> " + userAuth.getPassword());

            if (tempUser.getEmail().equals(userAuth.getEmail()) &&
                tempUser.getPassword().equals(userAuth.getPassword()) ) {
                authedUser = tempUser;
                System.out.println("SignInRepository logIn() USER FOUND!!:= " + tempUser);
                break;
            }
        }

        String token = getJWTToken(userAuth.getEmail());
        System.out.println("SignInRepository logIn() END USER token!:= " + token);
        System.out.println("SignInRepository logIn() END USER!:= " + authedUser);
        authedUser.setToken(token);
        System.out.println("SignInRepository logIn() END USER tokenized!:= " + authedUser);
        System.out.println("SignInRepository logIn() END OK!!");
        return new ResponseEntity<>(authedUser, HttpStatus.OK);
    }

    
    @RequestMapping(value = "/api/verify",  method={RequestMethod.POST})
    public ResponseEntity<Boolean> validateToken(String token, String username) {
        System.out.println("1. SignInRepository validateToken() token!:= " + token);
        System.out.println("2. SignInRepository validateToken() username!:= " + username);
		    String tokenUsername = getUsernameFromToken(token);
        System.out.println("3. SignInRepository validateToken() tokenUsername!:= " + tokenUsername);
        Boolean isValid = tokenUsername.equals(username) && !isTokenExpired(token);
        System.out.println("4. SignInRepository validateToken()! isValid!:= " + isValid);
		return new ResponseEntity<>(isValid, HttpStatus.OK);
    }

    private String getJWTToken(String username) {
      //List<GrantedAuthority> grantedAuthorities = AuthorityUtils
      //		.commaSeparatedStringToAuthorityList("ROLE_USER");
      System.out.println("1. SignInRepository getJWTToken()! username!:= " + username);
      String token = Jwts
          .builder()
          .setId("softtekJWT")
          .setSubject(username)
          .claim("authorities", new String[] { "dbuser", "admin" })
          .setIssuedAt(new Date(System.currentTimeMillis()))
          .setExpiration(new Date(System.currentTimeMillis() + 600000))
          .signWith(SignatureAlgorithm.HS512,
              secretKey.getBytes()).compact();
      System.out.println("2. SignInRepository getJWTToken()! token!:= " + token);

		//return "Bearer " + token;
    return token;
	}

  public Date getExpirationDateFromToken(String token) {
      Date expiration;
       System.out.println("1. SignInRepository getExpirationDateFromToken token!:= " + token);
      try {
        final Claims claims = getAllClaimsFromToken(token);
        expiration = claims.getExpiration();
      } catch (Exception e) {
        expiration = null;
      }
      return expiration;
    }

  private Claims getAllClaimsFromToken(String token) {
    System.out.println("1. SignInRepository getAllClaimsFromToken token!:= " + token);
    System.out.println(Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody());
    System.out.println("1. SignInRepository getAllClaimsFromToken token!:= " + token);
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
	}

	private Boolean isTokenExpired(String token) {
    System.out.println("1. SignInRepository isTokenExpired token!:= " + token);
		final Date expiration = getExpirationDateFromToken(token);
    System.out.println("2. SignInRepository isTokenExpired token!:= " + token);
		return expiration.before(new Date());
	}

  public String getUsernameFromToken(String token) {
      String username;
      try {
        System.out.println("1. SignInRepository getUsernameFromToken tokenized!:= " + token);
        final Claims claims = getAllClaimsFromToken(token);
        System.out.println("2. SignInRepository getUsernameFromToken claims!:= " + claims);
        username = claims.getSubject();
        System.out.println("3. SignInRepository getUsernameFromToken username!:= " + username);
      } catch (Exception e) {
        username = null;
      }
      return username;
    }

}