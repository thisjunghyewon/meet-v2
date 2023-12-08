// Event.js

import { useState } from "react";

const Event = ({ event, showWelcomeScreen }) => {
  const [showDetails, setShowDetails] = useState(false);

  // 구글 로그인이 완료되었고 WelcomeScreen이 감춰진 경우에만 이벤트를 렌더링
  if (showWelcomeScreen) {
    return null;
  }

  return (
    <li className="event">
      <h2>{event && event.summary}</h2>
      <p>{event && event.location}</p>
      <p>{event && new Date(event.created).toUTCString()}</p>
      {showDetails ? (
        <p className="details">{event && event.description}</p>
      ) : null}
      <button
        className="details-btn"
        onClick={() => {
          showDetails ? setShowDetails(false) : setShowDetails(true);
        }}
      >
        {showDetails ? "hide details" : "show details"}
      </button>
    </li>
  );
};

export default Event;
