package com.example.safarizote.controller;

import java.util.Date;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @GetMapping("/api/findAll")
    public ResponseEntity<List<UserAuth>> findAll() {
        List<UserAuth> users = repository.findAll();
        return ResponseEntity.ok().body(users);
    }

    @GetMapping("/api/login")
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
        return ResponseEntity.ok().body(authedUser);
    }
     
    @GetMapping("/api/verify")
    public ResponseEntity<Boolean> validateToken(@RequestBody UserAuth userAuth) {
        // The part after "Bearer "
        final String bearerToken = userAuth.getToken().substring(7);
		    String tokenUsername = getUsernameFromToken(bearerToken);
        Boolean isValid = tokenUsername.equals(userAuth.getEmail()) && !isTokenExpired(bearerToken);
        return ResponseEntity.ok().body(isValid);
    }
    
    public String getUsernameFromToken(@PathVariable("token") String token) {
      String username;
      try {
        final Claims claims = getAllClaimsFromToken(token);
        username = claims.getSubject();
      } catch (Exception e) {
        return null;
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