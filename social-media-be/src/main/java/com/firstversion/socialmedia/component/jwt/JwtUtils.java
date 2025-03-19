package com.firstversion.socialmedia.component.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Collections;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

/**
 * Lớp tiện ích để xử lý JWT: tạo, xác minh và trích xuất thông tin từ token.
 */
@Slf4j
@Component
public class JwtUtils {

    @Value("${security.jwt.secret}")
    private String jwtSecret;

    @Value("${security.jwt.expirationTime}")
    @Getter
    private long jwtExpirationTime;

    @Value("${security.jwt.refresh-token.re-expiration}")
    @Getter
    private long refreshExpirationTime;

    /**
     * Sinh khóa bí mật từ chuỗi mã hóa trong file cấu hình.
     *
     * @return Khóa bí mật để ký JWT
     */
    private Key getKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(jwtSecret));
    }

    /**
     * Tạo JWT token với các claims tùy chỉnh.
     *
     * @param extraClaims    Các claims bổ sung
     * @param userDetails    Thông tin người dùng
     * @param expirationTime Thời gian hết hạn của token (ms)
     * @return Token JWT đã được tạo
     */
    public String createToken(Map<String, Object> extraClaims, UserDetails userDetails, long expirationTime) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Tạo JWT token không có claims bổ sung.
     *
     * @param userDetails Thông tin người dùng
     * @return Token JWT
     */
    public String generateToken(UserDetails userDetails) {
        return createToken(Collections.emptyMap(), userDetails, jwtExpirationTime);
    }

    /**
     * Tạo JWT token với claims bổ sung.
     *
     * @param extraClaims Các claims bổ sung
     * @param userDetails Thông tin người dùng
     * @return Token JWT
     */
    public String generateTokenWithClaims(Map<String, Object> extraClaims, UserDetails userDetails) {
        return createToken(extraClaims, userDetails, jwtExpirationTime);
    }

    /**
     * Tạo token làm mới (refresh token).
     *
     * @param userDetails Thông tin người dùng
     * @return Token JWT dùng để làm mới
     */
    public String generateRefreshToken(UserDetails userDetails) {
        return createToken(Collections.emptyMap(), userDetails, refreshExpirationTime);
    }

    /**
     * Trích xuất tất cả claims từ token JWT.
     *
     * @param token Token JWT
     * @return Claims chứa thông tin của token
     */
    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Trích xuất một claim cụ thể từ token.
     *
     * @param token         Token JWT
     * @param claimsResolver Hàm xử lý để lấy claim mong muốn
     * @param <T>           Kiểu dữ liệu của claim
     * @return Giá trị claim
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        return claimsResolver.apply(extractAllClaims(token));
    }

    /**
     * Lấy username từ token JWT.
     *
     * @param token Token JWT
     * @return Username của người dùng
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Lấy ngày hết hạn của token.
     *
     * @param token Token JWT
     * @return Ngày hết hạn của token
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Kiểm tra xem token có hết hạn không.
     *
     * @param token Token JWT
     * @return True nếu token đã hết hạn, ngược lại False
     */
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Kiểm tra token có hợp lệ với một người dùng cụ thể không.
     *
     * @param token       Token JWT
     * @param userDetails Thông tin người dùng
     * @return True nếu token hợp lệ, ngược lại False
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        return userDetails.getUsername().equals(extractUsername(token)) && !isTokenExpired(token);
    }

    /**
     * Xác minh token JWT có hợp lệ không.
     *
     * @param token Token JWT
     * @return True nếu token hợp lệ, False nếu không
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.error("Token đã hết hạn: {}", e.getMessage());
        } catch (JwtException e) {
            log.error("Token không hợp lệ: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("Token không chứa claims hợp lệ: {}", e.getMessage());
        }
        return false;
    }
}
