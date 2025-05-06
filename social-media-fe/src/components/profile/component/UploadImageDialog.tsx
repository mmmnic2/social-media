import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import SocialAvatar from "@/components/common/avatar/SocialAvatar";
import { useUploadUserAvatar } from "@/hooks/api-hooks/user-hooks/useUser";
import { useAppStores } from "@/lib/context/AppStoreContext";

interface UploadAvatarDialogProps {
  open: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
}

const UploadAvatarDialog: React.FC<UploadAvatarDialogProps> = ({
  open,
  onClose,
  onUploadSuccess,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const { mutate: uploadAvatarMutate } = useUploadUserAvatar();
  const queryClient = useQueryClient();

  const { userStore } = useAppStores();
  const currentUser = userStore.getState().user;

  const validationSchema = Yup.object().shape({
    avatar: Yup.mixed().required("You must select an image"),
  });

  useEffect(() => {
    return () => {
      setPreview(null);
    };
  }, []);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Upload Avatar</DialogTitle>
      <Divider />
      <DialogContent>
        <Formik
          initialValues={{ avatar: null }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const formData = new FormData();
            if (values.avatar) {
              formData.append("image", values.avatar);
              uploadAvatarMutate(formData, {
                onSuccess: () => {
                  queryClient.refetchQueries({
                    queryKey: ["user", currentUser?.id],
                    exact: true,
                  });
                  onUploadSuccess();
                  setSubmitting(false);
                  onClose();
                },
                onError: () => {
                  setSubmitting(false);
                },
              });
            }
          }}
        >
          {({ setFieldValue, isSubmitting, resetForm }) => (
            <Form>
              <DialogContent>
                <div className="flex flex-col items-center space-y-4">
                  {/* Avatar Preview */}
                  {preview ? (
                    <div className="h-[10rem] w-[10rem]">
                      <SocialAvatar
                        imgUrl={preview}
                        alt={`${currentUser?.firstName} image`}
                        width="100%"
                        height="100%"
                      />
                    </div>
                  ) : (
                    <div className="h-[10rem] w-[10rem]">
                      <SocialAvatar
                        imgUrl={"#"}
                        alt={currentUser?.firstName || "Lan Lan"}
                        width="100%"
                        height="100%"
                      />
                    </div>
                  )}

                  <input
                    id="file"
                    name="avatar"
                    type="file"
                    accept="image/*"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.currentTarget.files?.[0];
                      if (file) {
                        setFieldValue("avatar", file);
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          setPreview(e.target?.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    style={{ display: "none" }}
                  />
                  <Button variant="contained" component="label" htmlFor="file">
                    Select Image
                  </Button>
                </div>
              </DialogContent>

              <DialogActions>
                <Button
                  onClick={() => {
                    onClose();
                    resetForm();
                    setPreview(null);
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Uploading..." : "Upload"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default UploadAvatarDialog;
