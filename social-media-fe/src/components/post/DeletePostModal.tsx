"use client";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AppButton } from "../common/button/AppButton";

interface DeletePostModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleApply: () => void;
}

const DeletePostModal = ({
  isOpen,
  handleClose,
  handleApply,
}: DeletePostModalProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{"Delete Post?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure want to delete this post?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <AppButton
          className="bg-gray hover:bg-gray/50 py-2 px-4"
          onClick={handleClose}
        >
          Disagree
        </AppButton>
        <AppButton
          className="bg-accent-color hover:bg-accent-color/50 py-2 px-4"
          onClick={handleApply}
        >
          Agree
        </AppButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePostModal;
