import AvatarWithInfo from "@/components/common/avatarWithInfo/AvatarWithInfo";

const FriendRequests = () => {
  return (
    <div className="mt-4">
      <h4 className="font-bold mt-4 mb-1 ">Requests</h4>
      <div className="bg-white p-4 rounded-xl mb-2">
        <div className="flex items-center gap-4 mb-4">
          <AvatarWithInfo
            alt="Nhi Nhi"
            imgUrl="adad"
            title="Nhi Nhi"
            subtitle="8 mutual friends"
          />
        </div>
        <div className="flex gap-4">
          <button className="bg-accent-color py-2 px-4 rounded-lg text-light hover:bg-primary">
            Accept
          </button>
          <button className="bg-gray text-light py-2 px-4 rounded-lg hover:bg-gray/50">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;
