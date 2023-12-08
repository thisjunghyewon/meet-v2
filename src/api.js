import mockData from "./mock-data";

export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

export const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    var newurl =
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
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    "https://hmq1hikj83.execute-api.eu-central-1.amazonaws.com/dev/api/token" +
      "/" +
      encodeCode
  )
    .then(async (res) => {
      return await res.json();
    })
    .catch((error) => error);
  access_token && localStorage.setItem("access_token", access_token);
  return access_token;
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");

  console.log("Access Token:", accessToken);

  if (accessToken) {
    const tokenCheck = await checkToken(accessToken);
    if (!tokenCheck.error) {
      return accessToken;
    }
  }

  // If there is no access token or it's invalid, initiate the login process
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get("code");

  if (!code) {
    try {
      const response = await fetch(
        "https://hmq1hikj83.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const { authUrl } = await response.json();
      // 로그인이 필요한 경우 Promise를 반환하여 대기하도록 변경
      return new Promise((resolve, reject) => {
        // 로그인 페이지로 이동
        window.location.href = authUrl;

        // 이 부분에서 resolve 또는 reject를 호출하여 Promise를 해결하거나 거부할 수 있음
        // 예: 로그인 완료 후 resolve 또는 로그인 실패 후 reject 호출
      });
    } catch (error) {
      console.error("Error fetching authentication URL:", error);
    }
  }

  // If there is an authentication code, get the token
  return code && getToken(code);
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
