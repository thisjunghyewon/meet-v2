// WelcomeScreen.jsx

import React from "react";
import "./WelcomeScreen.css";
import { Container, Col, Card } from "react-bootstrap";
import GoogleButton from "react-google-button";

function WelcomeScreen(props) {
  return props.showWelcomeScreen ? (
    <Container>
      <Col lg={4} md={8} className="mx-auto">
        <Card className="WelcomeScreen text-center mt-5">
          <Card.Body className="mt-4 mb-4">
            <Card.Title as="h1" className="mb-3 mt-2">
              Meet App
            </Card.Title>
            <p className="mb-4">
              Log in to see upcoming events around the world for full-stack
              developers
            </p>
            <Card.Footer>
              <GoogleButton
                className="mx-auto mt-2"
                onClick={() => {
                  props.getAccessToken();
                }}
              />
            </Card.Footer>
            <div className="privacy">
              <a
                href="https://thisjunghyewon.github.io/meet-v2/privacy.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy policy
              </a>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  ) : null;
}

export default WelcomeScreen;
