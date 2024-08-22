import { Avatar, IconButton, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as React from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserProfile } from "@/hooks/api-hooks/user-hooks/useUser";
import { updateUserInfo } from "@/redux/user";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  outline: "none",
  overFlow: "scroll-y",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

export default function UpdateProfileModal({
  open,
  handleClose,
  refetchUserProfile,
}: {
  open: boolean;
  handleClose: () => void;
  refetchUserProfile: () => void;
}) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const userInfor = useSelector((state: any) => state.user);
  const { mutate: updateUserProfile, isLoading } = useUpdateUserProfile();

  const handleSubmit = (values: any) => {
    updateUserProfile(values, {
      onSuccess: (data: any) => {
        dispatch(updateUserInfo(data));
        queryClient.invalidateQueries("user_profile");
        queryClient.invalidateQueries(["user", userInfor?.id]);
        refetchUserProfile();
        handleClose();
      },
      onError: (error: any) => {
        console.log(error.message);
      },
    });
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col items-center justify-center">
              <Typography
                id="keep-mounted-modal-title"
                variant="h5"
                component="h2"
                className="items-"
              >
                Edit Profile
              </Typography>

              <div>
                <div className=" h-[15rem] mb-0">
                  <img
                    className="h-full w-full rounded-t-md"
                    src="https://img.freepik.com/premium-photo/white-scottish-fold-cat-bicolor-cat-looks-sad-open-yellow-eyes-close-up-portrait_457363-1683.jpg"
                    alt="avatar"
                  />
                </div>
                <div className=" pl-5">
                  <Avatar
                    className="transform -translate-y-24"
                    sx={{ width: "10rem", height: "10rem" }}
                    src="https://img.freepik.com/premium-photo/white-scottish-fold-cat-bicolor-cat-looks-sad-open-yellow-eyes-close-up-portrait_457363-1683.jpg"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="mt-3 space-x-3">
                <Button variant="contained" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
