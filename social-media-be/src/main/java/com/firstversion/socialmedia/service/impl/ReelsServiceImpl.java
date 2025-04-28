package com.firstversion.socialmedia.service.impl;

import com.firstversion.socialmedia.dto.response.reels.ReelsResponse;
import com.firstversion.socialmedia.exception.NotFoundException;
import com.firstversion.socialmedia.exception.UserNotAuthorizedException;
import com.firstversion.socialmedia.model.entity.Reels;
import com.firstversion.socialmedia.model.entity.User;
import com.firstversion.socialmedia.repository.ReelsRepository;
import com.firstversion.socialmedia.repository.UserRepository;
import com.firstversion.socialmedia.component.jwt.JwtUtils;
import com.firstversion.socialmedia.service.ReelsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ReelsServiceImpl implements ReelsService {

    private final ReelsRepository reelsRepository;

    private final UserRepository userRepository;

    private final JwtUtils jwtUtils;

//    @Override
//    public ReelsResponse createReel(ReelsResponse reelsResponse, String email) {
//        email = jwtUtils.extractUsername(email);
//        User foundUser = userRepository.findUserByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));
//        Reels reels = new Reels();
//        reels.setVideo(reelsResponse.getVideo());
//        reels.setUser(foundUser);
//        reels.setTitle(reelsResponse.getTitle());
//        return reelsRepository.save(reels).toReelsResponse();
//    }

    @Override
    public List<ReelsResponse> findAllReels() {
        List<Reels> responses = reelsRepository.findAll();
        if (responses.isEmpty()) {
            return List.of();
        }
        return responses.stream().map(Reels::toReelsResponse).toList();
    }

    @Override
    public List<ReelsResponse> findReelByUser(Long userId) {
        User foundUser = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found."));
        List<Reels> responses = reelsRepository.findByUserId(userId);
        if(responses.isEmpty()) return List.of();
        return responses.stream().map(Reels::toReelsResponse).toList();
    }

    @Override
    public void deleteReel(Long reelId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        Reels reel = reelsRepository.findById(reelId).orElseThrow(() -> new NotFoundException("Reel not found."));
        if (!Objects.equals(user.getId(), reel.getUser().getId())) {
            throw new UserNotAuthorizedException("User do not have permitted");
        }
        reelsRepository.deleteById(reelId);
    }
}
