import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import React from "react";
import NotificationList from "./NotificationList";

interface NotificationDialogProps {
  open: boolean;
  onClose: () => void;
}

const NotificationDialog: React.FC<NotificationDialogProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Notifications</DialogTitle>
      <Divider />
      <DialogContent>
        <NotificationList />
      </DialogContent>
    </Dialog>
  );
};

export default NotificationDialog;
