// WelcomeScreen.jsx

import React from "react";
import "./WelcomeScreen.css";
import { Container, Col, Card } from "react-bootstrap";
import GoogleButton from "react-google-button";

function WelcomeScreen(props) {
  const handleGoogleLogin = async () => {
    try {
      // 구글 로그인 API를 호출하여 Access Token을 얻음
      const accessToken = await props.getAccessToken();

      // Access Token을 정상적으로 얻었을 때 처리
      console.log("Access Token:", accessToken);

      // 여기서 필요한 추가 작업 수행
      // 예: 다음 화면으로 이동 또는 필요한 데이터를 가져오는 등의 동작 수행
    } catch (error) {
      // 에러가 발생했을 때 처리
      console.error("Error during Google login:", error);
    }
  };

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
                onClick={handleGoogleLogin}
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
