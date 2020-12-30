import React from "react";
import styled from "styled-components";

const BoundingBoxContainer = styled.div.attrs({
  className: ``,
})`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const BoundingBox = styled.div.attrs({
  className: ``,
})`
  position: absolute;
  box-shadow: inset 0 0 0 3px #149df2;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
`;

const Boxes = ({ annotations, setAnnotationToView }) => {
  return (
    <BoundingBoxContainer>
      {annotations.map((annotation, index) => {
        const { x1, y1, x2, y2 } = annotation.rectangleCoordinates;
        return typeof annotation !== undefined ? (
          <BoundingBox
            key={annotation.annotationId}
            style={{
              top: x1,
              left: y1,
              bottom: x2,
              right: y2,
              zIndex: index,
              // zIndex: 99999 - index,
            }}
            onClick={() => {
              setAnnotationToView(annotation);
              console.log(`Clicked Annotation: ${annotation.annotationId}`);
            }}
          ></BoundingBox>
        ) : (
          <div key={annotation.annotationId}></div>
        );
      })}
    </BoundingBoxContainer>
  );
};

export default Boxes;
