"use client";
import AvatarWithInfo from "@/components/common/avatarWithInfo/AvatarWithInfo";
import { AppButton } from "@/components/common/button/AppButton";
import { useSnackbar } from "@/components/common/snackbar/Snackbar";
import {
  useFriendRequestActions,
  usePendingFriendRequests,
} from "@/hooks/api-hooks/friend-requests/useFriendRequests";

interface FriendActionsPayloadProps {
  requestId: number;
  status: "ACCEPTED" | "DECLINED";
}

const FriendRequests = ({ isLogin }: { isLogin: boolean }) => {
  const {
    data: pendingRequests,
    isLoading,
    refetch: refetchFriendRequests,
  } = usePendingFriendRequests();
  const { mutate: friendRequestActions } = useFriendRequestActions();
  const { showSnackbar } = useSnackbar();

  const handleAccept = (request: any) => {
    const payload: FriendActionsPayloadProps = {
      requestId: request.id,
      status: "ACCEPTED",
    };
    friendRequestActions(payload, {
      onSuccess: () => {
        showSnackbar("Friend Accepted!", "success");
        refetchFriendRequests();
      },
      onError: () => {
        showSnackbar("Accept friend failed!", "error");
      },
    });
  };

  const handleDecline = (request: any) => {
    const payload: FriendActionsPayloadProps = {
      requestId: request.id,
      status: "DECLINED",
    };
    friendRequestActions(payload, {
      onSuccess: () => {
        showSnackbar("Decline Friend Request Successfully!", "success");
        refetchFriendRequests();
      },
      onError: () => {
        showSnackbar("Decline Friend Request Failed!", "error");
      },
    });
  };

  const renderFriendRequests = () => {
    if (pendingRequests?.length > 0 && isLogin) {
      return pendingRequests.map((request: any) => (
        <div className="bg-white p-4 rounded-xl mb-2" key={request.id}>
          <div className="flex items-center gap-4 mb-4">
            <AvatarWithInfo
              alt={request?.user?.fullName}
              imgUrl={request?.user?.imageUrl}
              title={request?.user?.fullName}
              subtitle="6 mutual friends"
            />
          </div>
          <div className="flex gap-4">
            <AppButton
              className="bg-accent-color py-2 px-4 rounded-lg text-light hover:bg-primary"
              onClick={() => handleAccept(request)}
            >
              Accept
            </AppButton>
            <AppButton
              className="bg-gray text-light py-2 px-4 rounded-lg hover:bg-gray/50"
              onClick={() => handleDecline(request)}
            >
              Decline
            </AppButton>
          </div>
        </div>
      ));
    } else if (!isLogin) {
      return (
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
      );
    } else {
      return <div>No friend requests</div>;
    }
  };

  return (
    <div className="mt-4">
      <h4 className="font-bold mt-4 mb-1 ">Requests</h4>
      {renderFriendRequests()}
    </div>
  );
};

export default FriendRequests;
