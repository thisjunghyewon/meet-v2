// App.js

import React, { useEffect, useState, useCallback } from "react";
import WelcomeScreen from "./WelcomeScreen";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/Alert";
import CityEventsChart from "./components/CityEventsChart";
import EventGenresChart from "./components/EventGenresChart";

const App = () => {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  const fetchData = useCallback(async () => {
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
  }, [currentCity, currentNOE]);

  const handleGoogleLogin = async () => {
    await getAccessToken(); // Call the function to initiate Google login
  };

  useEffect(() => {
    const checkAccessToken = async () => {
      const hasToken = await checkToken();
      setHasAccessToken(hasToken);
      setShowWelcomeScreen(!hasToken);
    };

    checkAccessToken();
  }, []);

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
  }, [currentCity, currentNOE, hasAccessToken, fetchData]);

  return (
    <div className="App">
      {showWelcomeScreen && (
        <WelcomeScreen
          setHasAccessToken={setHasAccessToken}
          setShowWelcomeScreen={setShowWelcomeScreen}
          handleGoogleLogin={handleGoogleLogin}
        />
      )}
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      {!showWelcomeScreen && (
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
