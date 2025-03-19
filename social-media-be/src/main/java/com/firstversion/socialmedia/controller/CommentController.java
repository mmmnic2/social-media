package com.firstversion.socialmedia.controller;

import com.firstversion.socialmedia.dto.request.CommentRequest;
import com.firstversion.socialmedia.dto.response.comment.CommentLikeResponse;
import com.firstversion.socialmedia.dto.response.comment.CommentResponse;
import com.firstversion.socialmedia.service.CommentLikeService;
import com.firstversion.socialmedia.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller quản lý các API liên quan đến bình luận.
 */
@RestController
@RequestMapping("/api/v1/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;
    private final CommentLikeService commentLikeService;

    /**
     * API tạo bình luận mới trên một bài viết.
     *
     * @param postId         ID của bài viết cần bình luận.
     * @param commentRequest Dữ liệu yêu cầu tạo bình luận.
     * @return Bình luận đã được tạo thành công.
     */
    @PostMapping("/create-comment/post/{postId}")
    public ResponseEntity<CommentResponse> createComment(@PathVariable Long postId,
                                                         @RequestBody CommentRequest commentRequest) {
        CommentResponse response = commentService.createComment(commentRequest, postId);
        return ResponseEntity.ok(response);
    }

    /**
     * API like một bình luận.
     *
     * @param commentId ID của bình luận cần like.
     * @return Thông tin về lượt like của bình luận.
     */
    @PutMapping("/like/{commentId}")
    public ResponseEntity<CommentLikeResponse> likeComment(@PathVariable Long commentId) {
        CommentLikeResponse response = commentLikeService.likeComment(commentId);
        return ResponseEntity.ok(response);
    }

    /**
     * API cập nhật bình luận.
     *
     * @param commentRequest Dữ liệu bình luận cần cập nhật.
     * @return Bình luận sau khi cập nhật.
     */
    @PutMapping("/update")
    public ResponseEntity<CommentResponse> updateComment(@RequestBody CommentRequest commentRequest) {
        CommentResponse response = commentService.updateComment(commentRequest);
        return ResponseEntity.ok(response);
    }

    /**
     * API lấy danh sách bình luận của một bài viết.
     *
     * @param postId ID của bài viết.
     * @return Danh sách các bình luận của bài viết.
     */
    @GetMapping("/get-by-post/{postId}")
    public ResponseEntity<List<CommentResponse>> getCommentListByPostId(@PathVariable Long postId) {
        List<CommentResponse> responses = commentService.findCommentByPostId(postId);
        return ResponseEntity.ok(responses);
    }

    /**
     * API lấy tất cả các bình luận trong hệ thống.
     *
     * @return Danh sách tất cả bình luận.
     */
    @GetMapping("/all")
    public ResponseEntity<List<CommentResponse>> getAllComments() {
        List<CommentResponse> responses = commentService.getAllComments();
        return ResponseEntity.ok(responses);
    }
}
