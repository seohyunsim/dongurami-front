import { postPost } from 'apis/board';
import { getS3PresignedURL, uploadImage } from 'apis/image';
import { useRouter } from 'next/router';
import { useState } from "react";
import styles from "../../styles/Board/Write/WritePromotionContent.module.scss";

function WritePromition({ title, description }) {
  const router = useRouter();
  const [images, setImage] = useState([]);

  const onChange = async (e) => {
    const imagesURL = await Promise.all([...e.target.files].map(async (file) => {
      const { preSignedPutUrl: presignedURL, readObjectUrl: imageURL } = (await getS3PresignedURL(file.name)).data;
      await uploadImage(presignedURL, file);
      return { path: imageURL, name: file.name };
    }));
    setImage(imagesURL);
  }
  const onSubmit = () => {
    postPost('promotion', { title, description, images });
    router.push('/promotion');
  };

  return (
    <div className={styles.container}>
      <label htmlFor="imageInput">
        {(images.length === 0) ? (
          <img src="https://www.pngfind.com/pngs/m/66-661092_png-file-upload-image-icon-png-transparent-png.png" alt="preview" />
        ) :
        images.map((image, index) => (
          <img key={index} src={image.path} alt="preview" />
        ))}
        <p>사진 업로드</p>
      </label>
      <input id="imageInput" type="file" accept="image/*" onChange={onChange} multiple />
      <div className={styles.selectContainer}>
        <select>
          <option>동아리 선택</option>
          <option>우아한 애자일</option>
          <option>그웨</option>
        </select>
        <select>
          <option>태그 선택</option>
          <option>개발</option>
          <option>친목</option>
        </select>
      </div>
      <button onClick={onSubmit}>등록</button>
    </div>
  );
}

export default WritePromition;
