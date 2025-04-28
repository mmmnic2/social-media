package com.firstversion.socialmedia.service.impl;

import com.firstversion.socialmedia.dto.request.CreateMessageRequest;
import com.firstversion.socialmedia.dto.response.message.MessageResponse;
import com.firstversion.socialmedia.exception.NotFoundException;
import com.firstversion.socialmedia.exception.UserNotAuthorizedException;
import com.firstversion.socialmedia.model.entity.Chat;
import com.firstversion.socialmedia.model.entity.ChatMember;
import com.firstversion.socialmedia.model.entity.Message;
import com.firstversion.socialmedia.model.entity.User;
import com.firstversion.socialmedia.repository.ChatMemberRepository;
import com.firstversion.socialmedia.repository.ChatRepository;
import com.firstversion.socialmedia.repository.MessageRepository;
import com.firstversion.socialmedia.repository.UserRepository;
import com.firstversion.socialmedia.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;

    private final ChatRepository chatRepository;

    private final  ChatMemberRepository chatMemberRepository;

    @Override
    public MessageResponse createMessage(User user, CreateMessageRequest request) {
//        User foundUser = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found."));
        Chat foundChat = chatRepository.findById(request.getChatId()).orElseThrow(() -> new NotFoundException("Chat not found."));
        //check xem userId có thuộc đoạn chat hay không, nếu có thì tạo được message, nếu không thì ném lỗi
        ChatMember foundChatMember = chatMemberRepository.findByChatAndMember(request.getChatId(), user.getId()).orElseThrow(() -> new UserNotAuthorizedException("You do not have permission to send a message to this chat."));
        Message createMess = new Message();
        createMess.setContent(request.getContent());
        if (request.getImage() != null) createMess.setImage(request.getImage());
        createMess.setChat(foundChat);
        createMess.setSender(user);
        return messageRepository.save(createMess).toMessageResponse();
    }

    @Override
    public List<MessageResponse> findMessageByChat(Long chatId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User userLogin = (User) authentication.getPrincipal();
        Optional<Chat> foundChat= chatRepository.findById(chatId);
        Optional<ChatMember> foundMember = chatMemberRepository.findByChatAndMember(chatId, userLogin.getId());
        if(foundChat.isEmpty()) throw new NotFoundException("Chat not found");
        if(foundMember.isEmpty()) throw new UserNotAuthorizedException("You do not have permission to get messages from this chat.");
        return messageRepository.findByChatId(chatId).stream().map(Message::toMessageResponse).toList();
    }
}
