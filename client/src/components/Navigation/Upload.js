import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ReactComponent as Icon } from "../../assets/svgs/add.svg";

const UploadButton = styled.button.attrs({
  className: `bn bg-transparent b--transparent pa0 ma0 `,
})`
  fill: gray;
  transition: 0.15s ease-out;
  min-width: 100px;
  &:hover {
    fill: #505050;
    transition: 0.15s ease-in;
  }
`;

const UploadIcon = styled(Icon).attrs({ className: `shadow-hover` })`
  height: 1.6rem;
  object-fit: contain;
`;

const UploadFile = styled(Form.File).attrs({ className: `vh50` })``;

const Button = styled.button.attrs({
  className: `b--gray ma0 br2 ba hover-bg-light-gray`,
})`
  padding: 6px 20px;
  transition: 0.15s ease-out;
  background-color: transparent;
  min-width: 100px;
  &:hover {
    border-color: #505050;
    transition: 0.15s ease-in;
  }
`;

function UploadModal(props) {
  const [fileName, setFileName] = useState("Drop or select image here");
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <h2>Upload Image</h2>
      </Modal.Header>
      <Form.Group>
        <Modal.Body>
          <UploadFile
            type="file"
            className=""
            id=""
            label={fileName}
            onChange={(e) => setFileName(e.target.files[0].name)}
            custom
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button type="submit">Upload</Button>
        </Modal.Footer>
      </Form.Group>
    </Modal>
  );
}

function Upload() {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(true);

  return (
    <>
      <UploadButton type="button" onClick={toggleShow}>
        <UploadIcon />
      </UploadButton>

      <UploadModal show={show} onHide={() => setShow(false)} />
    </>
  );
}

export default Upload;
