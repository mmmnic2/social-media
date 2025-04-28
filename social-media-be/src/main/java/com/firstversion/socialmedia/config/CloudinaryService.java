package com.firstversion.socialmedia.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

/**
 * Service để xử lý upload và xoá file trên Cloudinary.
 */
@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    /**
     * Upload một file lên Cloudinary vào thư mục chỉ định.
     *
     * @param file       Tệp tin cần upload.
     * @param folderName Tên thư mục trên Cloudinary.
     * @return Map chứa thông tin về file đã upload.
     * @throws IOException Nếu có lỗi xảy ra khi upload.
     */
    public Map<String, Object> uploadFile(final MultipartFile file, final String folderName) throws IOException {
        return cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("folder", folderName));
    }

    /**
     * Upload một hình ảnh lên Cloudinary vào thư mục "social_media/{folderName}".
     *
     * @param file       Hình ảnh cần upload.
     * @param folderName Tên thư mục con trong "social_media".
     * @return Map chứa thông tin về hình ảnh đã upload.
     * @throws IOException Nếu có lỗi xảy ra khi upload.
     */
    public Map<String, Object> uploadImage(final MultipartFile file, final String folderName) throws IOException {
        return cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("folder", "social_media/" + folderName));
    }

    /**
     * Upload một video lên Cloudinary vào thư mục "social_media/{folderName}".
     *
     * @param file       Video cần upload.
     * @param folderName Tên thư mục con trong "social_media".
     * @return Map chứa thông tin về video đã upload.
     * @throws IOException Nếu có lỗi xảy ra khi upload.
     */
    public Map<String, Object> uploadVideo(final MultipartFile file, final String folderName) throws IOException {
        return cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap(
                        "folder", "social_media/" + folderName,
                        "resource_type", "video"
                ));
    }

    /**
     * Xoá một file trên Cloudinary bằng public ID.
     *
     * @param publicId ID của file cần xoá trên Cloudinary.
     * @return Map chứa thông tin về kết quả xoá.
     * @throws IOException Nếu có lỗi xảy ra khi xoá.
     */
    public Map<String, Object> delete(final String publicId) throws IOException {
        return cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }
}
