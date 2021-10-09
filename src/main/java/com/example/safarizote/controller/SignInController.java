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
import org.springframework.web.bind.annotation.PathVariable;

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
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/login",  method={RequestMethod.POST})
    public ResponseEntity<UserAuth> logIn(@RequestBody UserAuth userAuth) {
        UserAuth authedUser = null;
        List<UserAuth> users = repository.findAll();
        for (UserAuth tempUser : users) {
            if (tempUser.getEmail().equals(userAuth.getEmail()) &&
                tempUser.getPassword().equals(userAuth.getPassword()) ) {
                authedUser = tempUser;
                break;
            }
        }

        String token = getJWTToken(userAuth.getEmail());
        authedUser.setToken(token);
        return new ResponseEntity<>(authedUser, HttpStatus.OK);
    }
     
    @RequestMapping(value = "/api/verify",  method={RequestMethod.POST})
    public ResponseEntity<Boolean> validateToken(@RequestBody UserAuth userAuth) {
        // The part after "Bearer "
        final String bearerToken = userAuth.getToken().substring(7);
		    String tokenUsername = getUsernameFromToken(bearerToken);
        Boolean isValid = tokenUsername.equals(userAuth.getEmail()) && !isTokenExpired(bearerToken);
		return new ResponseEntity<>(isValid, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/api/userByToken/{token}", method = RequestMethod.GET)
    public String getUsernameFromToken(@PathVariable("token") String token) {
      String username;
      try {
        final Claims claims = getAllClaimsFromToken(token);
        username = claims.getSubject();
      } catch (Exception e) {
        username = null;
      }
      return username;
    }

  private String getJWTToken(String subject) {
      Map<String, Object> claims = new HashMap<>();
      claims.put("isAdmin", true);
      String token = Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
          .setExpiration(new Date(System.currentTimeMillis() + 600000))
          .signWith(SignatureAlgorithm.HS512, secretKey).compact(); 
		  return "Bearer " + token;
	}

  private Date getExpirationDateFromToken(String token) {
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
      Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
      return claims;
	}

	private Boolean isTokenExpired(String token) {
		  final Date expiration = getExpirationDateFromToken(token);
		  return expiration.before(new Date());
	}
}