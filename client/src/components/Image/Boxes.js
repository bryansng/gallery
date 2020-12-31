import React from "react";
import styled from "styled-components";

const BoundingBoxContainer = styled.div.attrs({
  className: ``,
})`
  position: absolute;
  display: flex;
`;

const BoundingBox = styled.div.attrs({
  className: ``,
})`
  position: absolute;
  box-shadow: inset 0 0 0 1.2px
    ${(props) => (props.isAddingAnnotation ? "#b3b3b3" : "#149df2")};
  opacity: 0.5;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  ${(props) =>
    !props.isAddingAnnotation &&
    `
    cursor: pointer;

    :hover {
    opacity: 1;
  }`}
`;

const Boxes = ({ annotations, setAnnotationToView, isAddingAnnotation }) => {
  function preventDragHandler(e) {
    e.preventDefault();
  }

  return (
    <BoundingBoxContainer>
      {annotations.map((annotation, index) => {
        const { x1, y1, x2, y2 } = annotation.rectangleCoordinates;
        return typeof annotation !== undefined ? (
          <BoundingBox
            key={annotation.annotationId}
            style={{
              top: y1,
              left: x1,
              width: x2 - x1 === 0 ? 1 : x2 - x1,
              height: y2 - y1 === 0 ? 1 : y2 - y1,
              zIndex: index,
              // zIndex: 99999 - index,
            }}
            onClick={() => {
              if (!isAddingAnnotation) {
                setAnnotationToView(annotation);
                console.log(`Clicked Annotation: ${annotation.annotationId}`);
              }
            }}
            // onClick={() =>
            //   !isAddingAnnotation ? setAnnotationToView(annotation) : {}
            // }
            onDragStart={preventDragHandler}
            isAddingAnnotation={isAddingAnnotation}
          ></BoundingBox>
        ) : (
          <div key={annotation.annotationId}></div>
        );
      })}
    </BoundingBoxContainer>
  );
};

export default Boxes;

export { BoundingBoxContainer };
