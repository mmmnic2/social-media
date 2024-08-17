import AvatarWithInfo from "@/components/common/avatarWithInfo/AvatarWithInfo";

const FriendRequests = () => {
  return (
    <div className="friend-requests">
      <h4>Requests</h4>
      <div className="request">
        <div className="info">
          <AvatarWithInfo
            alt="Nhi Nhi"
            imgUrl="adad"
            title="Nhi Nhi"
            subtitle="8 mutual friends"
          />
        </div>
        <div className="action">
          <button className="btn btn-primary">Accept</button>
          <button className="btn bg-gray-300">Decline</button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;
