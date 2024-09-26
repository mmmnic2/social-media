package com.firstversion.socialmedia.service.impl;

import com.firstversion.socialmedia.component.oauth2.CustomOAuth2User;
import com.firstversion.socialmedia.component.websocket.WSService;
import com.firstversion.socialmedia.config.CloudinaryService;
import com.firstversion.socialmedia.dto.request.CreateUserRequest;
import com.firstversion.socialmedia.dto.response.user.FollowUserResponse;
import com.firstversion.socialmedia.dto.response.user.UserResponse;
import com.firstversion.socialmedia.exception.AlreadyExistException;
import com.firstversion.socialmedia.exception.ForbiddenAccessException;
import com.firstversion.socialmedia.exception.NotFoundException;
import com.firstversion.socialmedia.model.entity.User;
import com.firstversion.socialmedia.model.entity.UserFollower;
import com.firstversion.socialmedia.model.enums.AuthProvider;
import com.firstversion.socialmedia.model.enums.Gender;
import com.firstversion.socialmedia.model.enums.Role;
import com.firstversion.socialmedia.model.enums.UserStatus;
import com.firstversion.socialmedia.repository.UserFollowerRepository;
import com.firstversion.socialmedia.repository.UserRepository;
import com.firstversion.socialmedia.component.jwt.JwtUtils;
import com.firstversion.socialmedia.service.NotificationService;
import com.firstversion.socialmedia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserFollowerRepository userFollowerRepository;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    CloudinaryService cloudinaryService;

    @Override
    public void register(CreateUserRequest userRequest) {
        if (userRepository.existsByEmail(userRequest.getEmail()))
            throw new AlreadyExistException("Email has already existed");
        User user = new User();
        user.setEmail(userRequest.getEmail());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setGender(Gender.valueOf(userRequest.getGender()));
        user.setRole(Role.ROLE_USER);
        user.setAuthProvider(AuthProvider.LOCAL);
        userRepository.save(user);
    }

    @Override
    public List<UserResponse> getAllUser() {
        List<User> users = userRepository.findAll();
        List<UserResponse> userResponses = new ArrayList<>();
        users.forEach(user -> userResponses.add(user.toUserResponse()));
        return userResponses;
    }

    @Override
    public UserResponse updateUser(CreateUserRequest createUserRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        if (createUserRequest.getEmail() != null) {
            if (userRepository.existsByEmail(createUserRequest.getEmail())) {
                throw new AlreadyExistException("Email has already existed.");
            }
            user.setEmail(createUserRequest.getEmail());
        }
        if (createUserRequest.getPassword() != null) {
            if (passwordEncoder.encode(createUserRequest.getPassword()).equals(user.getPassword())) {
                throw new AlreadyExistException("Password must be changed different with the old password");
            } else {
                user.setPassword(passwordEncoder.encode(createUserRequest.getPassword()));
            }
        }
        user.setFirstName(createUserRequest.getFirstName() != null ? createUserRequest.getFirstName() : user.getFirstName());
        user.setLastName(createUserRequest.getLastName() != null ? createUserRequest.getLastName() : user.getLastName());
        user.setGender(createUserRequest.getGender() != null ? Gender.valueOf(createUserRequest.getGender()) : user.getGender());
        User savedUser = userRepository.save(user);
        return savedUser.toUserResponse();
    }

    @Override
    public UserResponse findUserById(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User Id is not existed."));
        UserResponse response = user.toUserResponse();
        addListFollowerAndFollowing(response, user);
        return response;
    }

    @Override
    public UserResponse findUserByEmail(String email) {
        User foundUser = userRepository.findUserByEmail(email).orElseThrow(() -> new NotFoundException("Email is not existed."));
        UserResponse response = foundUser.toUserResponse();
        addListFollowerAndFollowing(response, foundUser);
        return response;
    }

    @Override
    public List<UserResponse> searchUsers(String query) {
        List<User> users = userRepository.searchUser(query);
        if (users == null)
            return null;
        List<UserResponse> userResponses = new ArrayList<>();
        users.forEach((user -> userResponses.add(user.toUserResponse())));
        return userResponses;
    }

    @Override
    public UserResponse findUserByJwt(String jwt) {
        String email = jwtUtils.extractUsername(jwt);
        User user = userRepository.findUserByEmail(email).get();
        return user.toUserResponse();
    }

    @Override
    public UserResponse findUserDetails() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User foundUser = (User) auth.getPrincipal();
        UserResponse response = foundUser.toUserResponse();
        addListFollowerAndFollowing(response, foundUser);
        return response;
    }

    @Override
    public String doUploadAvatar(MultipartFile image) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User foundUser = (User) authentication.getPrincipal();
        String imageUrl = null;
        if (image != null) {
            Map<String, Object> result = cloudinaryService.uploadImage(image);
            imageUrl = result.get("url").toString();
        }
        if (imageUrl != null) {
            foundUser.setImageUrl(imageUrl);
            userRepository.save(foundUser);
        }
        return imageUrl;
    }

    @Override
    public User processOAuthPostLogin(CustomOAuth2User oAuth2User) {
        Optional<User> existUser = userRepository.findUserByEmail(oAuth2User.getEmail());
        if (existUser.isEmpty()) {
            User newUser = new User();
            newUser.setEmail(oAuth2User.getEmail());
            newUser.setAuthProvider(AuthProvider.GOOGLE);
            newUser.setRole(Role.ROLE_USER);
            newUser.setImageUrl(oAuth2User.getPictureURL());
            newUser.setFirstName(oAuth2User.getFirstName());
            newUser.setLastName(oAuth2User.getLastName());
            System.out.println(oAuth2User.getGender());
            return userRepository.save(newUser);
        }
        return existUser.get();
    }


    private void addListFollowerAndFollowing(UserResponse userResponse, User user) {
        // Lấy danh sách following
        List<UserFollower> followingList = userFollowerRepository.findListUserFollowerByFollowerId(user.getId());
        List<FollowUserResponse> followingResponseList = followingList.stream().map((following) -> {
            FollowUserResponse response = new FollowUserResponse();
            response.setId(following.getFollowed().getId());
            response.setFirstName(following.getFollowed().getFirstName());
            response.setLastName(following.getFollowed().getLastName());
            return response;
        }).toList();
        //Lấy danh sách follower
        List<UserFollower> followerList = userFollowerRepository.findListUserFollowerByFollowedId(user.getId());
        List<FollowUserResponse> followerResponseList = followerList.stream().map((follower) -> {
            FollowUserResponse response = new FollowUserResponse();
            response.setId(follower.getFollower().getId());
            response.setFirstName(follower.getFollower().getFirstName());
            response.setLastName(follower.getFollower().getLastName());
            return response;
        }).toList();
        userResponse.setFollowerList(followerResponseList);
        userResponse.setFollowingList(followingResponseList);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUserByEmail(username).orElseThrow(() -> new NotFoundException("User not found."));
    }

    // set status user
    @Override
    public UserStatus updateUserStatus(Long userId, UserStatus newStatus) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User userLogin = (User) authentication.getPrincipal();
        if (!Objects.equals(userId, userLogin.getId()))
            throw new ForbiddenAccessException("You are not authorized to modify this user's information.");
        userLogin.setUserStatus(newStatus);
        User savedUser = userRepository.save(userLogin);
        return savedUser.getUserStatus();
    }

    @Override
    public List<UserResponse> getFriendList() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User userLogin = (User) authentication.getPrincipal();
        List<User> users = userRepository.getFriendList(userLogin.getId());
        return users.stream().map(User::toUserResponse).toList();
    }


}
