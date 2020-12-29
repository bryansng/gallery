import React from "react";
import styled from "styled-components";
import { ReactComponent as Next } from "../../assets/svgs/next.svg";
import Dexter from "../../assets/images/dexter.png";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
  Image,
} from "pure-react-carousel";

const Container = styled.div.attrs({
  className: `center v-mid mt5 mb5`,
})``;

const CenteredSlider = styled(Slider).attrs({
  className: `mw6 center`,
})`
  transition: 0.15s ease-in-out;
`;

const CustomSlide = styled(Slide).attrs({ className: `` })`
  list-style-type: none;
`;

const RoundDotGroup = styled(DotGroup).attrs({
  className: `tc bn bg-transparent b--transparent pa0 ma0`,
})`
  border-radius: 50%;
`;

const CenteredButtonBack = styled(ButtonBack).attrs({
  className: `center bn bg-transparent b--transparent pa0 ma0`,
})`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  fill: gray;
`;

const CenteredButtonNext = styled(ButtonNext).attrs({
  className: `center bn bg-transparent b--transparent pa0 ma0`,
})`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  fill: gray;
`;

const NextIcon = styled(Next).attrs({
  className: ``,
})`
  height: 1.6rem;
  object-fit: contain;
`;

const BackIcon = styled(Next).attrs({
  className: ``,
})`
  height: 1.6rem;
  object-fit: contain;
  transform: rotate(180deg);
`;

function ImageCarousel() {
  return (
    <Container>
      <CarouselProvider
        totalSlides={5}
        currentSlide={2}
        hasMasterSpinner
        lockOnWindowScroll
        isIntrinsicHeight
        className="center overflow-x-hidden"
      >
        <CenteredSlider>
          <CustomSlide
            index={0}
            classNameHidden="o-50 center flex items-center mw5 ml0 mr0"
            classNameVisible="o-100 grow ma0"
          >
            <Image src={Dexter} alt="dexter" />
          </CustomSlide>
          <CustomSlide
            index={1}
            classNameHidden="o-50 center flex items-center mw5 ml0 mr0"
            classNameVisible="o-100 grow ma0"
          >
            <Image src={Dexter} alt="dexter"></Image>
          </CustomSlide>
          <CustomSlide
            index={2}
            classNameHidden="o-50 center flex items-center mw5 ml0 mr0"
            classNameVisible="o-100 grow ma0"
          >
            <Image src={Dexter} alt="dexter"></Image>
          </CustomSlide>
          <CustomSlide
            index={3}
            classNameHidden="o-50 center flex items-center mw5 ml0 mr0"
            classNameVisible="o-100 grow ma0"
          >
            <Image src={Dexter} alt="dexter"></Image>
          </CustomSlide>
          <CustomSlide
            index={4}
            classNameHidden="o-50 center flex items-center mw5 ml0 mr0"
            classNameVisible="o-100 grow ma0"
          >
            <Image src={Dexter} alt="dexter"></Image>
          </CustomSlide>
        </CenteredSlider>
        <CenteredButtonBack>
          <BackIcon />
        </CenteredButtonBack>
        <CenteredButtonNext>
          <NextIcon />
        </CenteredButtonNext>
        <RoundDotGroup />
      </CarouselProvider>
    </Container>
  );
}

export default ImageCarousel;
