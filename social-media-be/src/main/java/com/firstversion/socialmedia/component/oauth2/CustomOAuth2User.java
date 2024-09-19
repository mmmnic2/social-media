package com.firstversion.socialmedia.component.oauth2;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomOAuth2User implements OAuth2User {
    private OAuth2User oauth2User;


    @Override
    public Map<String, Object> getAttributes() {
        return oauth2User.getAttributes();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return oauth2User.getAuthorities();
    }

    @Override
    public String getName() {
        return oauth2User.getAttribute("name");
    }

    public String getEmail() {
        return oauth2User.<String>getAttribute("email");
    }

    public String getFirstName() {
        return oauth2User.getAttribute("given_name");
    }

    public String getLastName() {
        return oauth2User.getAttribute("family_name");
    }

    public String getPictureURL() {
        return oauth2User.getAttribute("picture");
    }

    public String getGender() {
        return oauth2User.getAttribute("gender");
    }
}
