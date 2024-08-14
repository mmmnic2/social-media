import { Avatar, Button, CardHeader, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
const PopularUserCard = () => {
  return (
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          R
        </Avatar>
      }
      action={<Button size="small">Follow</Button>}
      title="Lan Lan"
      subheader="@lanlan159"
    />
  );
};

export default PopularUserCard;
