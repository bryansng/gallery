import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ErrorMessage from "../Common/ErrorMessage";
import DisabledHoverTooltipper from "../Common/HoverTooltipper";
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

  ${(props) => props.disabled && `pointer-events: none;`}
`;

function UploadModal({
  show,
  onHide,
  isAuthenticated,
  token,
  user,
  setRoute,
  setRouteData,
}) {
  const defaultFormFileLabel = "Drop or select image here";
  const [formFileLabel, setFormFileLabel] = useState(defaultFormFileLabel);
  const [hasFormError, setHasFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitError = (msg) => {
    setErrorMessage(msg);
    setHasFormError(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        console.log(resp);
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(`${resp.status} Unable to create new image.`);
      })
      .then((res) => {
        setRouteData({
          imageId: res.image.id,
        });
        setRoute(routes.view_image);
        onHide();
        setFormFileLabel(defaultFormFileLabel);
        console.log("Image created successfully.");
      })
      .catch((error) => {
        console.error(error);
        onSubmitError(error);
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
              label={formFileLabel ? formFileLabel : ""}
              onChange={(e) =>
                setFormFileLabel(
                  e.target.files[0]
                    ? e.target.files[0].name
                    : defaultFormFileLabel
                )
              }
              accept="image/*"
              required
              custom
              disabled={!isAuthenticated}
            />
          </Form.Group>

          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title..."
              defaultValue=""
              required
              disabled={!isAuthenticated}
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
              disabled={!isAuthenticated}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          {hasFormError && <ErrorMessage error>{errorMessage}</ErrorMessage>}
          {!isAuthenticated && (
            <ErrorMessage error>
              You must be signed in to upload an image.
            </ErrorMessage>
          )}
          <Modal.Footer>
            <DisabledHoverTooltipper
              actionMsg="upload the image"
              enableTooltip={!isAuthenticated}
            >
              <Button type="submit" disabled={!isAuthenticated}>
                Upload
              </Button>
            </DisabledHoverTooltipper>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function Upload({ isAuthenticated, token, user, setRoute, setRouteData }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <UploadButton type="button" onClick={handleShow}>
        <UploadIcon />
      </UploadButton>

      <UploadModal
        show={show}
        onHide={handleClose}
        isAuthenticated={isAuthenticated}
        token={token}
        user={user}
        setRoute={setRoute}
        setRouteData={setRouteData}
      />
    </>
  );
}

export default Upload;
