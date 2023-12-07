import mockData from "./mock-data";

export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");
  const tokenCheck = accessToken && (await checkToken(accessToken));

  // Check if the user is already logged in
  if (accessToken && !tokenCheck.error) {
    return accessToken;
  }

  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get("code");

  // If the user is not logged in and doesn't have an authentication code, redirect to WelcomeScreen
  if (!accessToken && !code) {
    window.location.href = "./WelcomeScreen.jsx";
    return;
  }

  // If the user has an authentication code, get the token
  return code && getToken(code);
};

const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

export const getEvents = async () => {
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }

  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    return events ? JSON.parse(events) : [];
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url =
      "https://hmq1hikj83.execute-api.eu-central-1.amazonaws.com/dev/api/get-events" +
      "/" +
      token;
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (result) {
        localStorage.setItem("lastEvents", JSON.stringify(result.events));
        return result.events;
      } else {
        // If result is falsy, return an empty array
        return [];
      }
    } catch (error) {
      console.error(error);
      // If an error occurs, return an empty array
      return [];
    }
  }
  // If there is no token, return an empty array
  return [];
};

const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);

    const response = await fetch(
      "https://hmq1hikj83.execute-api.eu-central-1.amazonaws.com/dev/api/token" +
        "/" +
        encodeCode
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { access_token } = await response.json();
    access_token && localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    error.json();
  }
};

export { checkToken };
