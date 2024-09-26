package com.firstversion.socialmedia.config;

import com.firstversion.socialmedia.component.jwt.AuthTokenFilter;
import com.firstversion.socialmedia.component.jwt.JwtAuthEntryPoint;
import com.firstversion.socialmedia.component.oauth2.CustomOAuth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Autowired
    UserDetailsService userDetailsService;
    @Autowired
    JwtAuthEntryPoint jwtAuthEntryPoint;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    LogoutHandler logoutHandler;
    @Autowired
    AuthenticationSuccessHandler customOAuth2SuccessHandler;
    @Autowired
    CustomOAuth2UserService oauthUserService;
    String[] swagger_ui_endpoint = {"/swagger-ui/**", "/v3/api-docs/**", "/api-docs/**"};
    String[] ws_endpoint = {"/ws/**"};

    @Bean
    public AuthTokenFilter authenticationTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthEntryPoint))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Phân quyền
                .authorizeHttpRequests(authorize ->
                        authorize.requestMatchers("/auth/**").permitAll()
                                .requestMatchers("/login/**", "/oauth2/**").permitAll()
                                .requestMatchers(swagger_ui_endpoint).permitAll()
                                .requestMatchers(ws_endpoint).permitAll()
                                .anyRequest().authenticated())
                // config Oauth2
                .oauth2Login(oauth2 -> oauth2
                        .authorizationEndpoint(authorization -> authorization
                                // đường dẫn uri khi chuyển hướng từ fe sang bên thứ 3 để đăng nhập là gg.
                                //  http://localhost:8080/login/oauth2/authorization/google
                                // thêm tien to google vao de oauth2 theo gg
                                .baseUri("/login/oauth2/authorization"))
                        // đăng nhập qua gg => khi thành công sẽ gọi vào hàm trong customOAuth2SuccessHandler
                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(oauthUserService)
                        )
                        .successHandler(customOAuth2SuccessHandler))
                // nhà cung cấp xác thực bằng cách sử dụng method authenticationProvider()
                // khi gọi hàm này, sẽ thêm authenticationProvider vào authenticationManagerBuilder
                // mục đích để authenticationManagerBuilder sẽ gồm 1 list authenticationProvider
                // => authenticationManager sẽ gọi lần lượt ra và thực hiện authenticate
                .authenticationProvider(authenticationProvider())
                // Thêm filter xác thực dựa trên JWT trước UsernamePasswordAuthenticationFilter
                .addFilterBefore(authenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class)
                // api logout
                .logout(logout ->
                        logout
                                .logoutUrl("/auth/logout")
                                .addLogoutHandler(logoutHandler)
                                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext()));


        return http.build();
    }

}
