package com.firstversion.socialmedia.config;

import com.firstversion.socialmedia.component.jwt.AuthTokenFilter;
import com.firstversion.socialmedia.component.jwt.JwtAuthEntryPoint;
import com.firstversion.socialmedia.component.jwt.JwtUtils;
import com.firstversion.socialmedia.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

/**
 * Cấu hình bảo mật của ứng dụng bằng Spring Security.
 * <p>
 * - Tắt CSRF (dành cho API RESTful).
 * - Xác thực và phân quyền bằng JWT.
 * - Cấu hình đăng nhập và đăng xuất.
 * - Tích hợp OAuth2 được tách riêng trong {@link OAuth2Config}.
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    private final UserDetailsService userDetailsService;
    private final JwtAuthEntryPoint jwtAuthEntryPoint;
    private final PasswordEncoder passwordEncoder;
    private final LogoutHandler logoutHandler;
    private final UserService userService;
    private final JwtUtils jwtUtils;
    @Value("${security.swagger-ui.endpoint}")
    private String[] swaggerUiEndpoints;

    @Value("${security.websocket.endpoint}")
    private String[] wsEndpoints;

    /**
     * Constructor để inject các dependency chính.
     */
    private String[] permitUrls = {"/auth/**", "/login/**", "/oauth2/**"};
    public WebSecurityConfig(UserDetailsService userDetailsService, JwtAuthEntryPoint jwtAuthEntryPoint,
                             PasswordEncoder passwordEncoder, LogoutHandler logoutHandler, UserService userService, JwtUtils jwtUtils) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthEntryPoint = jwtAuthEntryPoint;
        this.passwordEncoder = passwordEncoder;
        this.logoutHandler = logoutHandler;
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    /**
     * Bean filter xác thực JWT.
     *
     * @return AuthTokenFilter
     */
    @Bean
    public AuthTokenFilter authenticationTokenFilter() {
        return new AuthTokenFilter(userService, jwtUtils);
    }


    /**
     * Cấu hình AuthenticationManager.
     *
     * @param config {@link AuthenticationConfiguration}
     * @return AuthenticationManager
     * @throws Exception Nếu có lỗi xảy ra
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * Cấu hình AuthenticationProvider với userDetailsService và passwordEncoder.
     *
     * @return DaoAuthenticationProvider
     */
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }

    /**
     * Cấu hình Spring Security cho ứng dụng.
     *
     * @param http {@link HttpSecurity}
     * @return SecurityFilterChain
     * @throws Exception Nếu có lỗi xảy ra
     */
    @Bean
    @Order(1)
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthEntryPoint))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize ->
                        authorize.requestMatchers(permitUrls).permitAll()
                                .requestMatchers(swaggerUiEndpoints).permitAll()
                                .requestMatchers(wsEndpoints).permitAll()
                                .anyRequest().authenticated())
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(authenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class)
                .logout(logout ->
                        logout.logoutUrl("/auth/logout")
                                .addLogoutHandler(logoutHandler)
                                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext()));

        return http.build();
    }

}
