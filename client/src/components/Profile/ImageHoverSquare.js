import React from "react";
import styled from "styled-components";
import { ShowDate } from "../Common/ShowDate";
import { GetAnnotationNum } from "../Common/GetAnnotationNum";
import { GetUsername } from "../Common/GetUsername";
import { GetImageById } from "../Common/GetImageById";
import { service_endpoints } from "../../config/content.json";
import routes from "../../config/routes";

export default function ImageHoverSquare({
  image,
  showUsername,
  setRoute,
  setRouteData,
}) {
  if (!image.userId || !image.totalViews) image = GetImageById(image.id);
  return image && image.id ? (
    <Image
      style={{
        backgroundImage: `url("${service_endpoints.image.get_image}/${image.id}")`,
      }}
      onClick={() => {
        console.log(image.id);
        setRouteData({
          imageId: image.id,
        });
        setRoute(routes.view_image);
        console.log("CLICKED IMAGE");
      }}
    >
      <ImageHoverCover>
        <ImageHoverTitle>{image.title}</ImageHoverTitle>
        <ImageHoverDesc>{image.description}</ImageHoverDesc>
        {showUsername ? (
          <ImageHoverUser>
            by <GetUsername userId={image.userId} />
          </ImageHoverUser>
        ) : (
          ""
        )}
        <ImageHoverDate>
          {<ShowDate creationDateTime={image.creationDate} />}
        </ImageHoverDate>
        <ImageHoverNumberOfViews>
          {image.totalViews} views | {<GetAnnotationNum imageId={image.id} />}{" "}
          annotations
        </ImageHoverNumberOfViews>
        <ImageHoverNumberOfAnnotations></ImageHoverNumberOfAnnotations>
      </ImageHoverCover>
    </Image>
  ) : (
    <div></div>
  );
}

const Image = styled.div.attrs({
  className: `hide-child relative cover bg-center flex items-stretch justify-stretch grow w-30-l pointer img ma2`,
})`
  height: 30vh;
  width: 30vh;
`;

const ImageHoverCover = styled.div.attrs({
  className: `child center tc bg-black-40 white v-mid flex flex-column items-center justify-center pointer overflow-hidden`,
})`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ImageHoverTitle = styled.h4.attrs({ className: `overflow-hidden` })`
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const ImageHoverDesc = styled.p.attrs({
  className: `ph4 ph2-m overflow-hidden w-100`,
})`
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const ImageHoverUser = styled.p.attrs({ className: `i` })``;
const ImageHoverDate = styled.p.attrs({ className: `i` })``;
const ImageHoverNumberOfViews = styled.p.attrs({ className: `` })``;
const ImageHoverNumberOfAnnotations = styled.p.attrs({ className: `` })``;
