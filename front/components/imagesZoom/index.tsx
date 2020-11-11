import React, { useState } from "react";
import Slider from "react-slick";
import {
  Overlay,
  Global,
  Header,
  CloseBtn,
  SlickWrapper,
  ImageWrapper,
  Indicator,
} from "./styles";

interface Props {
  images: {
    src: string;
  }[];
  onClose: () => void;
}

const ImagesZoom = ({ images, onClose }: Props) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slider
            initialSlide={1} // 0번째부터
            beforeChange={(slide) => setCurrentSlide(slide)} // 현재 슬라이드 state로 받아옴
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((image) => (
              <ImageWrapper key={image.src}>
                <img src={image.src} alt={image.src} />
              </ImageWrapper>
            ))}
          </Slider>
          <Indicator>
            <div>{`${currentSlide + 1}/${images.length}`}</div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

export default ImagesZoom;
