let DEBUG = true;
let HOST_URL = "http://127.0.0.1:8000";
let SOCKET_URL = "ws://127.0.0.1:8000";
if (DEBUG) {
  HOST_URL = "https://chatup-vezaks.herokuapp.com";
  SOCKET_URL = "wss://chatup-vezaks.herokuapp.com";
}

export { HOST_URL, SOCKET_URL };