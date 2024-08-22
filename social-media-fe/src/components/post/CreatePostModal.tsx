import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import {
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useCreatePost } from "@/hooks/api-hooks/post-hooks/usePost";
import { refetchAllPostSelector } from "@/redux/post/selectors";
import AvatarSocial from "../common/avatar/SocialAvatar";
import LoadingOverlay from "../common/loading/LoadingOverlay";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "0.6rem",
  // outline: "none",
};

const CreatePostModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { mutate: handleCreatePost, isLoading, data } = useCreatePost();
  const [selectedImage, setSelectedImage] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [imageSrc, setImageSrc] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const refetchAllPost = useSelector(refetchAllPostSelector);
  const formik = useFormik({
    initialValues: {
      caption: "",
      image: null,
      video: null,
    },
    onSubmit: (values) => {
      handleCreatePost(values, {
        onSuccess: (data) => {
          setSelectedVideo(undefined);
          setSelectedImage(undefined);
          setImageSrc("");
          setVideoSrc("");
          formik.setFieldValue("caption", null);
          formik.setFieldValue("video", null);
          formik.setFieldValue("image", null);
          // dùng 1 trong 2:
          //Cách 1:
          // queryClient.invalidateQueries("all_posts");
          //Cách 2:
          refetchAllPost();
          ///
          handleClose();
        },
      });
    },
  });

  const handleSelect = (e: any) => {
    const file = e.target.files[0];
    if (e.target.name === "image") {
      setSelectedImage(e.target.files);
      const createImgSrc = URL.createObjectURL(file);
      setImageSrc(createImgSrc);
    } else if (e.target.name === "video") {
      setSelectedVideo(e.target.files);
      const createVideoSrc = URL.createObjectURL(file);
      setVideoSrc(createVideoSrc);
    }
    formik.setFieldValue(e.target.name, file);
  };

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
            <div className="flex flex-col space-y-4">
              <div className="">
                {/* <AvatarSocial
                  title="Lan Lan"
                  subtitle="@lanlan"
                  imgUrl="https://png.pngtree.com/png-clipart/20210608/ourlarge/pngtree-dark-gray-simple-avatar-png-image_3418404.jpg"
                /> */}
              </div>
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
                  outline: "none",
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
                    id={"image-input"}
                    name="image"
                  />
                  <label htmlFor="image-input">
                    <IconButton color="primary" component="span">
                      <ImageIcon />
                    </IconButton>
                  </label>
                  <span>Image</span>
                </div>

                <div>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleSelect}
                    style={{ display: "none" }}
                    id={"video-input"}
                    name="video"
                  />
                  <label htmlFor="video-input">
                    <IconButton color="primary" component="span">
                      <VideocamIcon />
                    </IconButton>
                  </label>
                  <span>Video</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              {selectedImage && (
                <div>
                  <img
                    src={imageSrc}
                    alt="image"
                    className="h-[10rem] rounded-lg"
                  />
                </div>
              )}
              {selectedVideo && (
                <div>
                  <video
                    src={videoSrc}
                    autoPlay
                    className="h-[10rem] rounded-lg"
                  />
                </div>
              )}
            </div>
            <div className="flex w-full justify-end">
              <Button
                type="submit"
                variant="contained"
                sx={{ borderRadius: "1.5rem" }}
              >
                Post
              </Button>
            </div>
          </form>
          <LoadingOverlay isLoading={isLoading} />
        </Box>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
