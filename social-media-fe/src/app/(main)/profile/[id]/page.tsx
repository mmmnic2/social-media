import AddIcon from "@mui/icons-material/Add";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";
import SocialAvatar from "@/components/common/avatar/SocialAvatar";
import { AppButton } from "@/components/common/button/AppButton";
import PostCardV2 from "@/components/post/PostCardV2";
import Profile from "@/components/profile/Profile";

const arrUser = [1, 1, 1, 1, 1];
const ProfilePage = ({ params }: { params: { id: string } }) => {
  const token = cookies().get("sessionToken");
  console.log(params);
  console.log(token);
  return (
    <div>
      <Profile id={params.id} isLogin={!!token} />
      <div className="mt-4 -translate-y-44">
        {arrUser.map((item, idx) => (
          <PostCardV2 key={idx} post={[]} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
