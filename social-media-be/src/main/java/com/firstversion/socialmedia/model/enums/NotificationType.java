package com.firstversion.socialmedia.model.enums;

public enum NotificationType {
    FRIEND_REQUEST{
        @Override
        public String getPrefix() {
            return "sent a friend request.";
        }
    },
    TAG{
        @Override
        public String getPrefix() {
            return "tagged you in a post.";
        }
    },
    LIKE_POST {
        @Override
        public String getPrefix() {
            return "liked your post.";
        }
    },
    LIKE_COMMENT{
        @Override
        public String getPrefix() {
            return "liked your comment.";
        }
    },
    COMMENT{
        @Override
        public String getPrefix() {
            return "commented on your post.";
        }
    };
    public abstract String getPrefix();
}