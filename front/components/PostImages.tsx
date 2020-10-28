import React from "react";

interface Props {
  images: {
    src: string;
  }[];
}

const PostImages = ({ images }: Props) => {
  return (
    <div>
      {images.map((image) => (
        <img key={image.src} src={image.src} alt={image.src} />
      ))}
    </div>
  );
};

export default PostImages;
