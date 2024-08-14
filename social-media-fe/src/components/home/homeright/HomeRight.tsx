import { Card } from "@mui/material";
import PopularUserCard from "./searchuser/PopularUserCard";
import SearchUser from "./searchuser/SearchUser";
const popularUser = [1, 1, 1, 11, 1];
const HomeRight = () => {
  return (
    <div>
      <SearchUser />
      <Card className="px-5">
        <div className="flex justify-between px-5 items-center mt-4">
          <p className="font-semibold opacity-70">Suggestions for you</p>
          <p className="text-xs font-semibold opacity-95">View All</p>
        </div>
        <div>
          {popularUser.map((user) => (
            <PopularUserCard key={user} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HomeRight;
