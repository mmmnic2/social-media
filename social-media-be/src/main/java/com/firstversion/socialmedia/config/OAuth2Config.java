package com.firstversion.socialmedia.config;

import com.firstversion.socialmedia.component.oauth2.CustomOAuth2UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Cấu hình xác thực OAuth2 cho ứng dụng.
 * <p>
 * - Hỗ trợ đăng nhập bằng Google, Facebook, v.v.
 * - Xử lý thông tin người dùng OAuth2 thông qua {@link CustomOAuth2UserService}.
 * - Tùy chỉnh hành động sau khi đăng nhập thành công với {@link AuthenticationSuccessHandler}.
 */
@Configuration
public class OAuth2Config {

    private final CustomOAuth2UserService oauthUserService;
    private final AuthenticationSuccessHandler customOAuth2SuccessHandler;

    /**
     * Constructor để inject các dependency.
     */
    public OAuth2Config(CustomOAuth2UserService oauthUserService, AuthenticationSuccessHandler customOAuth2SuccessHandler) {
        this.oauthUserService = oauthUserService;
        this.customOAuth2SuccessHandler = customOAuth2SuccessHandler;
    }

    /**
     * Cấu hình OAuth2 login.
     *
     * @param http {@link HttpSecurity}
     * @return SecurityFilterChain
     * @throws Exception Nếu có lỗi xảy ra
     */
    @Bean
    @Order(2)
    public SecurityFilterChain oauth2SecurityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .oauth2Login(oauth2 -> oauth2
                .authorizationEndpoint(authorization -> authorization
                        .baseUri("/login/oauth2/authorization"))
                .userInfoEndpoint(userInfo -> userInfo.userService(oauthUserService))
                .successHandler(customOAuth2SuccessHandler));

        return http.build();
    }
}
