import React from "react";

const Messsages = () => {
  return (
    <div className="messages">
      {/* ---------HEADING------------ */}
      <div className="heading">
        <h4>Messages</h4>
        <i className="uil uil-edit"></i>
      </div>
      {/* ---------SEARCH BAR------------ */}
      <div className="search-bar">
        <i className="uil uil-search"></i>
        <input
          type="search"
          placeholder="Search messages"
          id="message-search"
        />
      </div>
      <div className="category">
        <h6 className="active">Primary</h6>
        <h6>General</h6>
        <h6 className="message-requests">Requests(2)</h6>
      </div>
      {/* -----------Messages----------- */}
      <div className="message">
        <div className="profile-photo">
          <img src="/public/image/image1.png" alt="" />
        </div>
        <div className="message-body">
          <h5>Lan Lan</h5>
          <p className="text-muted">How are you?</p>
        </div>
      </div>

      {/* ----------FRIEND REQUEST -------------- */}
      <div className="friend-requests">
        <h4>Requests</h4>
        <div className="request">
          <div className="info">
            <img src="public/image/image1.png" alt="" />
          </div>
          <div>
            <h5>Nhi Nhi</h5>
            <p className="text-muted">8 mutual friends</p>
          </div>
        </div>
        <div className="action">
          <button className="btn btn-primary">Accept</button>
          <button className="btn">Decline</button>
        </div>
      </div>
    </div>
  );
};

export default Messsages;
