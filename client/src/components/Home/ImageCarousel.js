import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Next } from "../../assets/svgs/next.svg";
import content from "../../config/content.json";
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

const ImageHoverCover = styled.div.attrs({
  className: `child bg-black-40 white v-mid w-100 h-100 `,
})``;

const ImageHoverTitle = styled.h4.attrs({ className: `` })``;
const ImageHoverDesc = styled.p.attrs({ className: `` })``;
const ImageHoverUser = styled.p.attrs({ className: `i` })``;
const ImageHoverNumberOfViews = styled.p.attrs({ className: `` })``;
const ImageHoverNumberOfAnnotations = styled.p.attrs({ className: `` })``;

function ImageHover(props) {
  <ImageHoverCover>
    <ImageHoverTitle>{props.title}</ImageHoverTitle>
    <ImageHoverDesc>{props.desc}</ImageHoverDesc>
    <ImageHoverUser>{props.user}</ImageHoverUser>
    <ImageHoverNumberOfViews>{props.viewNum}</ImageHoverNumberOfViews>
    <ImageHoverNumberOfAnnotations>
      {props.annotationNum}
    </ImageHoverNumberOfAnnotations>
  </ImageHoverCover>;
}

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
/**
 * Images as an array
 * array index is required
 * for each image: source, title, desc, user, viewNum, annotationNum is required
 * @param {*} props
 */

const { recent, get_image } = content.service_endpoints.image;

function ImageCarousel(props) {
  const [imagesData, setImagesData] = useState([]);

  useEffect(() => {
    console.log(`${recent}/5`);
    if (imagesData.length === 0) {
      fetch(`${recent}/5`)
        .then((resp) => resp.json())
        .then((res) => {
          setImagesData(res.images);
          console.log(res);
        });
    }
  });

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
          {imagesData.map((image, index) => (
            <CustomSlide
              index={index}
              classNameHidden="o-50"
              classNameVisible="o-100 grow ma0"
              className="center flex items-center mw6"
              innerClassName="center"
            >
              <Image src={`${get_image}/${image.id}`} type="img">
                {/* <ImageHover
                  title={image.title}
                  desc={image.description}
                  user={image.user}
                  // viewNum={image.viewNum}
                  // annotationNum={image.annotaionNum}
                ></ImageHover> */}
              </Image>
            </CustomSlide>
          ))}
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
  // return (
  //   <Container>
  //     <CarouselProvider
  //       totalSlides={5}
  //       currentSlide={2}
  //       hasMasterSpinner
  //       lockOnWindowScroll
  //       isIntrinsicHeight
  //       className="center overflow-x-hidden"
  //     >
  //       <CenteredSlider>
  //         <CustomSlide
  //           index={0}
  //           classNameHidden="o-50 center flex items-center mw5 ml0 mr0"
  //           classNameVisible="o-100 grow ma0"
  //         >
  //           <Image
  //             src={Dexter}
  //             alt="dexter"
  //             type="img"
  //             className="hide-child"
  //           ></Image>
  //         </CustomSlide>
  //         <CustomSlide
  //           index={1}
  //           classNameHidden="o-50 center flex items-center mw5 ml0 mr0"
  //           classNameVisible="o-100 grow ma0"
  //         >
  //           <Image
  //             src={Dexter}
  //             alt="dexter"
  //             type="img"
  //             className="hide-child"
  //           ></Image>
  //         </CustomSlide>
  //         <CustomSlide
  //           index={2}
  //           classNameHidden="o-50 center flex items-center mw5 ml0 mr0"
  //           classNameVisible="o-100 grow ma0"
  //         >
  //           <Image
  //             src={Dexter}
  //             alt="dexter"
  //             type="img"
  //             className="hide-child"
  //           ></Image>
  //         </CustomSlide>
  //         <CustomSlide
  //           index={3}
  //           classNameHidden="o-50 center flex items-center mw5 ml0 mr0"
  //           classNameVisible="o-100 grow ma0"
  //         >
  //           <Image
  //             src={Dexter}
  //             alt="dexter"
  //             type="img"
  //             className="hide-child"
  //           ></Image>
  //         </CustomSlide>
  //         <CustomSlide
  //           index={4}
  //           classNameHidden="o-50 center flex items-center mw5 ml0 mr0"
  //           classNameVisible="o-100 grow ma0"
  //         >
  //           <Image
  //             src={Dexter}
  //             alt="dexter"
  //             type="img"
  //             className="hide-child"
  //           ></Image>
  //         </CustomSlide>
  //       </CenteredSlider>
  //       <CenteredButtonBack>
  //         <BackIcon />
  //       </CenteredButtonBack>
  //       <CenteredButtonNext>
  //         <NextIcon />
  //       </CenteredButtonNext>
  //       <RoundDotGroup />
  //     </CarouselProvider>
  //   </Container>
  // );
}

export default ImageCarousel;
