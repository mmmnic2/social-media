"use client";
import AddIcon from "@mui/icons-material/Add";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NotificationPayload } from "@/api/notification";
import { useSendFriendRequest } from "@/hooks/api-hooks/friend-requests/useFriendRequests";
import { useSendNotification } from "@/hooks/api-hooks/notification-hooks/useNotification";
import { useGetUserById } from "@/hooks/api-hooks/user-hooks/useUser";
import { RootState } from "@/redux/store";
import SocialAvatar from "../common/avatar/SocialAvatar";
import { AppButton } from "../common/button/AppButton";
import { useSnackbar } from "../common/snackbar/Snackbar";
import UploadAvatarDialog from "./component/UploadImageDialog";

interface ProfileProps {
  id: string | number;
  isLogin: boolean;
}

const Profile = ({ id, isLogin }: ProfileProps) => {
  const userSelector = useSelector((state: RootState) => state.user);
  const { posts } = useSelector((state: any) => state.post);
  const { showSnackbar } = useSnackbar();
  const [isUploadImageDialogOpen, setIsUploadImageDialogOpen] = useState(false);
  // hàm getUserInforByUserId
  const {
    data: userInfor,
  }: {
    data: any;
  } = useGetUserById(id);

  const { mutate: sendFriendRequest, isSuccess: sendFriendRequestSuccess } =
    useSendFriendRequest();
  const { mutate: sendNotificationMutate } = useSendNotification();
  const handleFollowUser = () => {
    const reqBody = {
      userId: userSelector.id,
      friendId: userInfor.id,
    };
    sendFriendRequest(reqBody, {
      onSuccess: () => {
        showSnackbar("Send friend request successfully!", "success");
      },
      onError: () => {
        showSnackbar("Send friend request error!", "error");
      },
    });
  };
  const sendFriendRequestNoti = () => {
    const friendNotiReqBoby: NotificationPayload = {
      senderId: userSelector.id,
      receiverId: userInfor.id,
      notificationType: "FRIEND_REQUEST",
    };
    sendNotificationMutate(friendNotiReqBoby);
  };
  useEffect(() => {
    if (sendFriendRequestSuccess) {
      sendFriendRequestNoti();
    }
  }, [sendFriendRequestSuccess]);

  const renderFollowButton = () => {
    if (Number(id) !== userSelector.id) {
      return (
        <AppButton
          className="bg-accent-color rounded-lg px-4 py-2 h-10 bottom-0 left-1/3 z-110 hover:bg-accent-color/50"
          style={{ position: "absolute" }}
          disabled={!isLogin}
          onClick={handleFollowUser}
        >
          <p className="flex items-center text-white">
            <span>Follow</span> <AddIcon />
          </p>
        </AppButton>
      );
    } else if (!isLogin) {
      return (
        <AppButton
          className="bg-accent-color rounded-lg px-4 py-2 h-10 bottom-0 left-1/3 z-11 hover:bg-accent-color/50"
          style={{ position: "absolute" }}
          disabled={!isLogin}
        >
          <p className="flex items-center text-white">
            <span>Follow</span> <AddIcon />
          </p>
        </AppButton>
      );
    } else {
      return null;
    }
  };
  return (
    <>
      <div className="relative">
        <div className="w-full h-96">
          <Image
            src="/image/cat_bg.jpg"
            alt="Main Image"
            objectFit="cover"
            layout="fill"
            quality={100}
          />
        </div>
        <div className="absolute left-0 bottom-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#fff"
              fill-opacity="1"
              d="M0,160L48,144C96,128,192,96,288,74.7C384,53,480,43,576,80C672,117,768,203,864,240C960,277,1056,267,1152,240C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="-translate-y-56">
        <div
          className="bg-white h-[10rem] w-[10rem] rounded-t-full p-1 rounded-br-full group relative cursor-pointer"
          onClick={() => setIsUploadImageDialogOpen(true)}
        >
          <SocialAvatar
            imgUrl={userSelector?.imageUrl ? userSelector.imageUrl : "/"}
            alt={userInfor?.firstName || "Lan Lan"}
            height="100%"
            width="100%"
          />
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <CameraAltIcon />
          </div>
        </div>
        <div className="relative z-10">
          <p className="px-[2rem] mt-4 font-bold text-2xl">
            {(userInfor && `${userInfor.firstName} ${userInfor.lastName}`) ||
              "Lan Lan"}
          </p>
          {renderFollowButton()}
        </div>
      </div>
      {/* Profile Description */}
      <div className="bg-white w-full -translate-y-52 relative z-10">
        <div className="pt-4 px-[2rem]">
          <p>Description</p>
          <div className="grid grid-cols-3 py-4">
            <div className="flex flex-col items-center relative">
              <span className="text-2xl font-bold">
                {(posts && posts?.length) || 0}
              </span>
              <span className="text-sm">Posts</span>
              <div className="absolute top-0 right-0 w-[2px] h-full bg-text-primary"></div>
            </div>
            <div className="flex flex-col items-center  relative">
              <span className="text-2xl font-bold">
                {(userInfor?.followerList && userInfor?.followerList.length) ||
                  0}
              </span>
              <span className="text-sm">Followers</span>
              <div className="absolute top-0 right-0 w-[2px] h-full bg-text-primary"></div>
            </div>
            <div className="flex flex-col items-center ">
              <span className="text-2xl font-bold">
                {(userInfor?.followingList.length > 0 &&
                  userInfor?.followingList.length) ||
                  0}
              </span>
              <span className="text-sm">Following</span>
            </div>
          </div>
        </div>
      </div>
      <UploadAvatarDialog
        open={isUploadImageDialogOpen}
        onClose={() => setIsUploadImageDialogOpen(!isUploadImageDialogOpen)}
      />
    </>
  );
};

export default Profile;
