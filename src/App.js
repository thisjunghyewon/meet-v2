// App.js

import React, { useEffect, useState } from "react";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import { getEvents, extractLocations, checkToken } from "./api";
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/Alert";
import CityEventsChart from "./components/CityEventsChart";
import EventGenresChart from "./components/EventGenresChart";
import WelcomeScreen from "./WelcomeScreen";

import "./App.css";

const App = () => {
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  useEffect(() => {
    const checkAccessToken = async () => {
      const hasToken = await checkToken();
      setHasAccessToken(hasToken);

      // If the user has the token, don't show the WelcomeScreen
      if (hasToken) {
        setShowWelcomeScreen(false);
      }
    };

    checkAccessToken();
  }, []);

  const fetchData = async () => {
    try {
      const allEvents = await getEvents();
      const filteredEvents =
        currentCity === "See all cities"
          ? allEvents
          : allEvents.filter((event) => event.location === currentCity);
      setEvents(filteredEvents.slice(0, currentNOE));
      setAllLocations(extractLocations(allEvents));
    } catch (error) {
      console.error(error);
      setErrorAlert("Failed to fetch events. Please try again.");
    }
  };

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
      if (hasAccessToken) {
        fetchData();
      }
    } else {
      setWarningAlert(
        "You appear to be offline. Some events you see may not be up to date."
      );
    }
    // fetchData 함수를 try-catch로 감싸 에러 핸들링
  }, [currentCity, currentNOE, hasAccessToken]);

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      {showWelcomeScreen ? (
        <WelcomeScreen
          setHasAccessToken={setHasAccessToken}
          setShowWelcomeScreen={setShowWelcomeScreen}
        />
      ) : (
        <>
          <CitySearch
            allLocations={allLocations}
            setCurrentCity={setCurrentCity}
            setInfoAlert={setInfoAlert}
          />
          <NumberOfEvents
            setCurrentNOE={setCurrentNOE}
            setErrorAlert={setErrorAlert}
          />

          <div className="charts-container">
            <EventGenresChart events={events} />
            <CityEventsChart allLocations={allLocations} events={events} />
          </div>
          <EventList events={events} />
        </>
      )}
    </div>
  );
};

export default App;
