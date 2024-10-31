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
    },
    MESSAGE{
        @Override
        public String getPrefix(){
            return "send you a message.";
        }
    },
    FRIEND_REQUEST_ACCEPTED{
        @Override
        public String getPrefix() {
            return "and you are friend now.";
        }
    };
    public abstract String getPrefix();
}
