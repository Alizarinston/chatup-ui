let DEBUG = true;
let HOST_URL = "http://localhost:8000";
let SOCKET_URL = "ws://localhost:8000";
if (DEBUG) {
  HOST_URL = "https://chatup-vezaks.herokuapp.com";
  SOCKET_URL = "wss://chatup-vezaks.herokuapp.com";
}

export { HOST_URL, SOCKET_URL };