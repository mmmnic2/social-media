import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useCreatePost } from "@/hooks/api-hooks/post-hooks/usePost";
import { setIsFetchAllPosts } from "@/redux/post/post";
import { AppButton } from "../common/button/AppButton";
import { useSnackbar } from "../common/snackbar/Snackbar";

const CreatePostModal = ({
  open,
  handleClose,
  postData,
}: {
  open: boolean;
  handleClose: () => void;
  postData?: any;
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { mutate: handleCreatePost, isLoading } = useCreatePost();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [mediaSrc, setMediaSrc] = useState<string | null>(null);
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      caption: postData?.caption || "",
      image: postData?.image || null,
      video: postData?.video || null,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      handleCreatePost(values, {
        onSuccess: () => {
          setSelectedImage(null);
          setSelectedVideo(null);
          setMediaSrc(null);
          formik.resetForm();
          dispatch(setIsFetchAllPosts(true));
          showSnackbar(
            `${postData ? "Edit" : "Create"} Post successfully!`,
            "success",
          );
          handleClose();
        },
      });
    },
  });

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    setMediaSrc(fileURL);

    if (e.target.name === "image") {
      setSelectedImage(file);
      setSelectedVideo(null);
    } else if (e.target.name === "video") {
      setSelectedVideo(file);
      setSelectedImage(null);
    }
    formik.setFieldValue(e.target.name, file);
  };

  const destructiveSeleted = () => {
    setSelectedVideo(null);
    setSelectedImage(null);
    setMediaSrc(null);
  };

  const handlePost = () => {
    formik.handleSubmit();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby={`${postData ? "edit" : "create"}-dialog`}
    >
      <DialogTitle id="responsive-dialog-title">
        {`${postData ? "Edit" : "Create"} Post`}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col space-y-4">
            <TextField
              variant="outlined"
              placeholder="Write caption..."
              name="caption"
              id="caption"
              onChange={formik.handleChange}
              value={formik.values.caption}
              multiline
              rows={6}
              maxRows={8}
              sx={{
                backgroundColor: "transparent",
                width: "100%",
              }}
            />
            <div className="flex space-x-5 items-center mt-5">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSelect}
                  style={{ display: "none" }}
                  id="image-input"
                  name="image"
                />
                <label htmlFor="image-input">
                  <IconButton color="primary" component="span">
                    <ImageIcon />
                  </IconButton>
                  <span className="cursor-pointer">Image</span>
                </label>
              </div>

              <div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleSelect}
                  style={{ display: "none" }}
                  id="video-input"
                  name="video"
                />
                <label htmlFor="video-input">
                  <IconButton color="primary" component="span">
                    <VideocamIcon />
                  </IconButton>
                  <span className="cursor-pointer">Video</span>
                </label>
              </div>
            </div>
          </div>
          <div className="flex space-x-2 mt-5">
            {selectedImage && (
              <div className="relative flex-1">
                <Image
                  width={100}
                  height={100}
                  src={mediaSrc!}
                  alt="Image preview"
                  className="rounded-xl min-w-full"
                />
                <div
                  className="absolute -top-3 -right-3 text-primary cursor-pointer"
                  onClick={destructiveSeleted}
                >
                  <HighlightOffIcon />
                </div>
              </div>
            )}
            {selectedVideo && (
              <div>
                <video
                  src={mediaSrc!}
                  autoPlay
                  className="h-[10rem] rounded-lg"
                />
              </div>
            )}
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <AppButton
          type="submit"
          className="bg-accent-color text-text-primary hover:bg-accent-color/50 px-4 py-2"
          onClick={handlePost}
        >
          {postData ? "Update" : "Post"}
        </AppButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostModal;
