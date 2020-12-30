import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ReactComponent as Icon } from "../../assets/svgs/add.svg";
import { service_endpoints } from "../../config/content.json";
import routes from "../../config/routes";
const imageEndpoints = service_endpoints.image;

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

const FakeButton = styled.div.attrs({
  className: `b--gray ma0 br2 ba hover-bg-light-gray tc pointer`,
})`
  padding: 6px 20px;
  transition: 0.15s ease-out;
  background-color: transparent;
  min-width: 100px;
  &:hover {
    border-color: #505050;
    transition: 0.15s ease-in;
  }
  user-select: none;
`;

const Button = styled.button.attrs({
  className: `b--gray ma0 br2 ba hover-bg-light-gray tc`,
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
  const { show, onHide, token, user, setRoute, setRouteData } = props;
  const [fileName, setFileName] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.formImageFile.files[0]);

    // get form inputs
    // upload multipart/form-data with image and data.
    // https://stackoverflow.com/questions/35192841/fetch-post-with-multipart-form-data
    const formData = new FormData();
    formData.append("imageFile", e.target.formImageFile.files[0]);
    formData.append("userId", user.id);
    formData.append("title", e.target.formTitle.value);
    formData.append("description", e.target.formDescription.value);

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
      },
      body: formData,
    };

    fetch(imageEndpoints.create, requestOptions)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(`${resp.status} Unable to create new image.`);
      })
      .then((res) => {
        setRouteData({ image: res.image });
        setRoute(routes.view_image);
        console.log("Image created successfully.");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <h2>Upload Image</h2>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group controlId="formImageFile">
            <Form.File
              type="file"
              label={fileName}
              className=""
              onChange={(e) => setFileName(e.target.files[0].name)}
              accept="image/*"
              defaultValue=""
              required
              custom
            />
          </Form.Group>

          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title..."
              defaultValue=""
              required
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description..."
              defaultValue=""
              required
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Modal.Footer>
            <FakeButton onClick={() => onHide()}>Close</FakeButton>
            <Button onClick={() => onHide()} type="submit">
              Upload
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function Upload(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <UploadButton type="button" onClick={handleShow}>
        <UploadIcon />
      </UploadButton>

      <UploadModal {...props} show={show} onHide={handleClose} />
    </>
  );
}

export default Upload;
