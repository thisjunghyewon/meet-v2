import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <li>
      <h3>{event.summary}</h3>
      <p>{event.created}</p>
      <p>{event.location}</p>;
      <button
        onClick={() => {
          setShowDetails(!showDetails);
        }}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails ? (
        <div className="details">
          <h4>Event Details</h4>
          <p>Description: {event.description}</p>
          <p>Event status: {event.status}</p>
        </div>
      ) : null}
    </li>
  );
};

export default Event;
