package com.example.safarizote.controller;

import java.util.Date;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.safarizote.model.UserAuth;
import com.example.safarizote.repository.SignInRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;

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
            System.out.println("SignInRepository logIn() FROM DB:= " + userAuth.getToken());
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
    public ResponseEntity<Boolean> validateToken(@RequestBody UserAuth userAuth) {
        System.out.println("1. SignInRepository validateToken() token!:= " + userAuth.getToken());
        System.out.println("2. SignInRepository validateToken() email!:= " + userAuth.getEmail());
        System.out.println("3. SignInRepository validateToken() password!:= " + userAuth.getPassword());
        System.out.println("4. SignInRepository validateToken() password!:= " + userAuth.getDateCreated());
        // The part after "Bearer "
        final String bearerToken = userAuth.getToken().substring(7);

		    String tokenUsername = getUsernameFromToken(bearerToken);
        System.out.println("5. SignInRepository validateToken() tokenUsername!:= " + tokenUsername);
        Boolean isValid = tokenUsername.equals(userAuth.getEmail()) && !isTokenExpired(bearerToken);
        System.out.println("6. SignInRepository validateToken()! isValid!:= " + isValid);
		return new ResponseEntity<>(isValid, HttpStatus.OK);
    }

    private String getJWTToken(String subject) {
      //List<GrantedAuthority> grantedAuthorities = AuthorityUtils
      //		.commaSeparatedStringToAuthorityList("ROLE_USER");
      System.out.println("1. SignInRepository getJWTToken()! subject!:= " + subject);
      Map<String, Object> claims = new HashMap<>();
      claims.put("isAdmin", true);

     /* String token = Jwts
          .builder()
          .setId("softtekJWT")
          .setSubject(subject)
          .claim("authorities", new String[] { "dbuser", "admin" })
          .setIssuedAt(new Date(System.currentTimeMillis()))
          .setExpiration(new Date(System.currentTimeMillis() + 600000))
          .signWith(SignatureAlgorithm.HS512,
              secretKey.getBytes()).compact(); */

              String token = Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
              .setExpiration(new Date(System.currentTimeMillis() + 600000))
              .signWith(SignatureAlgorithm.HS512, secretKey).compact();        
      System.out.println("2. SignInRepository getJWTToken()! token!:= " + token);

		return "Bearer " + token;
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
    System.out.println("1A. SignInRepository getAllClaimsFromToken token!:= " + token);
    System.out.println("1B. SignInRepository getAllClaimsFromToken token!:= " + token);
/*
    Map<String, Object> claims = new HashMap<>();
    claims.put("isAdmin", true);

    String subject = "m@gmail.com";
    int jwtExpirationInMs = 6000;
    String tokenTemp = Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
				.signWith(SignatureAlgorithm.HS512, secretKey).compact();
*/
    Claims claimsTEmp = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    System.out.println("CB. SignInRepository getAllClaimsFromToken subject!:= " + claimsTEmp.getSubject());



    /*String userId = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    System.out.println("2. SignInRepository getAllClaimsFromToken userId!:= " + userId);
    String issuer = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getIssuer();
    System.out.println("3. SignInRepository getAllClaimsFromToken userId!:= " + issuer);
    System.out.println(Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject());
    System.out.println("4. SignInRepository getAllClaimsFromToken token!:= " + token);*/
		//return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    return claimsTEmp;
	}

	private Boolean isTokenExpired(String token) {
    System.out.println("1. SignInRepository isTokenExpired token!:= " + token);
		final Date expiration = getExpirationDateFromToken(token);
    System.out.println("2. SignInRepository isTokenExpired expiration!:= " + expiration);
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