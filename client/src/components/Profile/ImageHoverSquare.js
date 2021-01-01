import React from "react";
import styled from "styled-components";

export default function ImageHoverSquare({
  imageUrl,
  title,
  description,
  username,
  totalViews,
  annotationNum,
}) {
  return (
    <Image style={{ backgroundImage: `url("${imageUrl}")` }}>
      <ImageHoverCover>
        <ImageHoverTitle>{title}</ImageHoverTitle>
        <ImageHoverDesc>{description}</ImageHoverDesc>
        {{ username } ? <ImageHoverUser>by {username}</ImageHoverUser> : ""}
        <ImageHoverNumberOfViews>{totalViews} views</ImageHoverNumberOfViews>
        <ImageHoverNumberOfAnnotations>
          {annotationNum} annotations
        </ImageHoverNumberOfAnnotations>
      </ImageHoverCover>
    </Image>
  );
}

const Image = styled.div.attrs({
  className: `hide-child relative cover bg-center flex items-stretch justify-stretch grow w-30-l pointer img ma2`,
})`
  height: 30vh;
  width: 30vh;
`;

const ImageHoverCover = styled.div.attrs({
  className: `child center bg-black-40 white v-mid flex flex-column items-center justify-center pointer`,
})`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ImageHoverTitle = styled.h4.attrs({ className: `` })``;
const ImageHoverDesc = styled.p.attrs({
  className: `ph4 ph2-m overflow-hidden`,
})`
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const ImageHoverUser = styled.p.attrs({ className: `i` })``;
const ImageHoverNumberOfViews = styled.p.attrs({ className: `` })``;
const ImageHoverNumberOfAnnotations = styled.p.attrs({ className: `` })``;
