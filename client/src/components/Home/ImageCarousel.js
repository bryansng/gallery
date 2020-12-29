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
  className: `center mt5 mb5`,
})``;

const CenteredSlider = styled(Slider).attrs({
  className: `center`,
})`
  transition: 0.15s ease-in-out;
`;

const CustomSlide = styled(Slide).attrs({ className: `` })`
  list-style-type: none;
`;

const ImageHoverCover = styled.div.attrs({
  className: `child center bg-black-40 white v-mid flex flex-column items-center justify-center w-100 h-100`,
})`
  /* width: 30vw;
  height: 30vh; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ImageHoverTitle = styled.h4.attrs({ className: `` })``;
const ImageHoverDesc = styled.p.attrs({ className: `` })``;
const ImageHoverUser = styled.p.attrs({ className: `i` })``;
const ImageHoverNumberOfViews = styled.p.attrs({ className: `` })``;
const ImageHoverNumberOfAnnotations = styled.p.attrs({ className: `` })``;

function ImageHover(props) {
  const { title, description, username, totalViews, annotationNum } = props;
  return (
    <ImageHoverCover>
      <ImageHoverTitle>{title}</ImageHoverTitle>
      <ImageHoverDesc>{description}</ImageHoverDesc>
      <ImageHoverUser>by {username}</ImageHoverUser>
      <ImageHoverNumberOfViews>{totalViews} views</ImageHoverNumberOfViews>
      <ImageHoverNumberOfAnnotations>
        {annotationNum} annotations
      </ImageHoverNumberOfAnnotations>
    </ImageHoverCover>
  );
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
// const { username } = content.service_endpoints.user;
const { get_by_image } = content.service_endpoints.annotation;

function GetUsername(props) {
  const { userId } = props;
  const [name, setUsername] = useState("");
  useEffect(() => {
    fetch(`${content.service_endpoints.user.username}/${userId}`)
      .then((resp) => resp.json())
      .then((res) => {
        setUsername(res.user.username);
      });
  });
  return name;
}

function GetAnnotationNum(props) {
  const { imageId } = props;
  const [number, setNumber] = useState(0);
  useEffect(() => {
    fetch(`${content.service_endpoints.annotation.get_by_image}/${imageId}`)
      .then((resp) => resp.json())
      .then((res) => {
        setNumber(res.annotations.length);
      });
  });
  return number;
}

function ImageCarousel(props) {
  const [imagesData, setImagesData] = useState([]);

  useEffect(() => {
    console.log(`${recent}/5`);
    if (imagesData.length === 0) {
      // get images
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
        isIntrinsicHeight
        hasMasterSpinner
        lockOnWindowScroll
        className="overflow-x-hidden"
      >
        <CenteredSlider>
          {imagesData.map((image, index) => (
            <CustomSlide
              index={index}
              classNameHidden="o-50"
              classNameVisible="o-100 grow ma0 "
              className="center flex flex-row items-center "
              innerClassName="center v-mid "
            >
              <Image
                src={`${get_image}/${image.id}`}
                tag="div"
                alt={image.title}
                className="hide-child relative contain bg-center"
                style={{ width: "30vw", minHeight: "30vh" }}
              >
                {/* <div className=""> */}
                {console.log("IMAGE ID" + image.userId)}
                <ImageHover
                  title={image.title}
                  description={image.description}
                  username={<GetUsername userId={image.userId} />}
                  totalViews={image.totalViews}
                  annotationNum={<GetAnnotationNum imageId={image.id} />}
                ></ImageHover>
                {/* </div> */}
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
