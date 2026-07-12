package com.smartstay.user_service.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.time.Duration;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    // Generate token AND store in Redis
    public String generateToken(String email) {
        String token = Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();

        // Store in Redis with 24 hour expiry
        redisTemplate.opsForValue().set(
            "jwt:" + token,
            email,
            Duration.ofMillis(expiration)
        );

        System.out.println("Token stored in Redis for: " + email);
        return token;
    }

    // Extract email from token
    public String extractEmail(String token) {
        // Try Redis first
        String emailFromRedis = redisTemplate.opsForValue()
                .get("jwt:" + token);
        if (emailFromRedis != null) {
            return emailFromRedis;
        }

        // Fallback to JWT parsing
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Validate token using Redis
    public boolean validateToken(String token) {
        // Check Redis first (fast!)
        String emailFromRedis = redisTemplate.opsForValue()
                .get("jwt:" + token);
        if (emailFromRedis != null) {
            System.out.println("Token validated from Redis cache!");
            return true;
        }

        // Fallback to JWT signature check
        try {
            Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    // Invalidate token on logout
    public void invalidateToken(String token) {
        redisTemplate.delete("jwt:" + token);
        System.out.println("Token removed from Redis (logout)");
    }
}