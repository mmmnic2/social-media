import React from "react";

const PostCardV2 = () => {
  return (
    <div className="feed">
      {/* ======== POST CARD HEADER========== */}
      <div className="head">
        <div className="user">
          <div className="profile-photo">
            <img src="./image/image1.png" alt="" />
          </div>
          <div className="ingo">
            <h3>Lan Lan</h3>
            <small>15 MINUTES AGO</small>
          </div>
        </div>
        <span className="edit">
          <i className="uil uil-ellipsis-h"></i>
        </span>
      </div>
      {/* ======== POST CARD BODY========== */}

      <div className="body">
        <div className="caption">
          <p>Great Food!</p>
        </div>
        <div className="photo">
          <img src="./image/image1.png" alt="" />
        </div>
      </div>
      {/* ======== POST CARD FOOTER========== */}
      <div className="foot">
        <div className="liked-by">
          <div className="comments text-muted">25 Likes</div>
          <div className="comments text-muted">25 Comments</div>
        </div>
        <div className="action-button">
          <div className="interaction-buttons">
            <span>
              <i className="uil uil-heart"></i>
            </span>
            <span>
              <i className="uil uil-comment-dots"></i>
            </span>
            <span>
              <i className="uil uil-share-alt"></i>
            </span>
          </div>
          <div className="book-mark">
            <span>
              <i className="uil uil-bookmark-full"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardV2;
