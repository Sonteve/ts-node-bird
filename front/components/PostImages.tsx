import { PlusOutlined } from "@ant-design/icons";
import React, { useCallback, useState } from "react";
import ImagesZoom from "./imagesZoom";
interface Props {
  images: {
    src: string;
  }[];
}

const PostImages = ({ images }: Props) => {
  const [showImagesZoom, setShowImagesZoom] = useState<boolean>(false);
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img
          role="_presentation"
          // 클릭 할수는 있지만 클릭할 필요없다고 스크린리더가
          // 알아들음 => button이나 인풋아닌것에게 넣어주면 좋음
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
          style={{ width: "100%" }}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <div style={{ display: "flex" }}>
        <img
          role="_presentation"
          style={{ width: "50%" }}
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          role="_presentation"
          style={{ width: "50%" }}
          src={images[1].src}
          alt={images[1].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </div>
    );
  }
  return (
    <>
      <div>
        <img
          role="_presentation"
          width="50%"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <div
          role="_presentation"
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          <PlusOutlined onClick={onZoom} />
          <br />
          {images.length - 1}개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

export default PostImages;
