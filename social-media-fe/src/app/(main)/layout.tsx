import { Grid } from "@mui/material";
import HomeRight from "@/components/home/homeright/HomeRight";
import Sidebar from "@/components/layout/Sidebar";
const MainLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="px-20 ">
      <Grid container spacing={0}>
        <Grid item xs={0} lg={3}>
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </Grid>
        <Grid item xs={12} lg={9} className="px-5 flex justify-center">
          {children}
        </Grid>
        {/* <Grid
          item
          className="px-5 flex justify-center"
          xs={12}
          // lg={currentPath == "/" ? 6 : 9}
          lg={9}
        >
          {children}
        </Grid>
        <Grid item lg={3} className="relative">
          <div className="sticky top-0 w-full">
            <HomeRight />
          </div>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default MainLayout;
