import { cookies } from "next/headers";
import { PostList } from "@/components/post/PostList";
import Profile from "@/components/profile/Profile";

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const token = cookies().get("sessionToken");
  return (
    <div>
      <Profile id={params.id} isLogin={!!token} />
      <div className="mt-4 -translate-y-52">
        <PostList id={params.id} isLogin={!!token} />
      </div>
    </div>
  );
};

export default ProfilePage;
