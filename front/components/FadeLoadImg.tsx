import React, { useEffect } from "react";
import styled from "styled-components";
interface Props {
  srcPreload: string;
  srcLoaded: string;
}

const FadeLoadImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .iron-image-preload {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    filter: blur(5px);
    background-size: cover;
  }

  .iron-image-loaded {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-size: cover;
    opacity: 0;
    transition: opacity 1s ease;
  }

  .iron-image-fade-in {
    opacity: 1;
  }
`;

const FadeLoadImg = ({ srcPreload, srcLoaded }: Props) => {
  let ironImageHd: any = null;
  useEffect(() => {
    const hdLoaderImg = new Image();

    hdLoaderImg.src = srcLoaded;

    hdLoaderImg.onload = () => {
      ironImageHd.setAttribute(
        "style",
        `background-image: url('${srcLoaded}')`
      );
      ironImageHd.classList.add("iron-image-fade-in");
    };
  }, []);
  return (
    <FadeLoadImgWrapper>
      <div
        className="iron-image-loaded"
        ref={(imageLoadedElem) => (ironImageHd = imageLoadedElem)}
      ></div>

      <div
        className="iron-image-preload"
        style={{ backgroundImage: `url('${srcPreload}')` }}
      ></div>
    </FadeLoadImgWrapper>
  );
};

export default FadeLoadImg;
