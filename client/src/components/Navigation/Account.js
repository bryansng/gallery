import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const Button = styled.button.attrs({
  className: `b--gray ma0 br2 ba hover-bg-light-gray ml1 mr1`,
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

const Container = styled.div.attrs({ className: `ma0 pa0` })``;

function SignInModal(props) {
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <h2>Welcome back!</h2>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group controlId="formSignInEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
          </Form.Group>
          <Form.Group controlId="formSignInPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={props.switch}>
            New user? Register
          </Button>
          <Button type="submit">Sign in</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
function RegisterModal(props) {
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <h2>Welcome!</h2>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group controlId="formRegisterUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Username" required />
          </Form.Group>
          <Form.Group controlId="formRegisterEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Email address" required />
          </Form.Group>
          <Form.Group controlId="formRegisterPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>
          <Form.Group controlId="formRegisterConfirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.switch}>Existing user? Sign in</Button>
          <Button type="submit">Register</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function Account() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  return (
    <Container>
      <Button type="button" onClick={() => setShowSignIn(true)}>
        Sign in
      </Button>
      <Button type="button" onClick={() => setShowRegister(true)}>
        Register
      </Button>
      <SignInModal
        show={showSignIn}
        switch={() => {
          setShowSignIn(false);
          setShowRegister(true);
        }}
        onHide={() => setShowSignIn(false)}
      />
      <RegisterModal
        show={showRegister}
        switch={() => {
          setShowRegister(false);
          setShowSignIn(true);
        }}
        onHide={() => setShowRegister(false)}
      />
    </Container>
  );
}

export default Account;
